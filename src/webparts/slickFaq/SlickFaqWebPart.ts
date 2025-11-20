import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneGroup,
  PropertyPaneButton,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import { IFaq, ISlickFaqProps, SlickFaq } from './components/SlickFaq';


export interface ISlickFaqWebPartProps {
  webpartTitle: string;
  faqs: IFaq[];
  faqsSearchableQuestions: string;
  faqsSearchableAnswers: string;
  allowZeroExpanded: boolean;
  allowMultipleExpanded: boolean;
}

export default class SlickFaqWebPart extends BaseClientSideWebPart<ISlickFaqWebPartProps> {

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'webpartTitle': { isSearchablePlainText: true },
      'faqsSearchableQuestions': { isSearchablePlainText: true },
      'faqsSearchableAnswers': { isSearchablePlainText: true }
    };
  }

  private SelectedItemId: string = null;

  public render(): void {

    const element: React.ReactElement<ISlickFaqProps> = React.createElement(
      SlickFaq,
      {
        webPartTitle: this.properties.webpartTitle,
        setWebpartTitle: (val: string) => { this.properties.webpartTitle = val },
        faqs: this.properties.faqs,
        setFaqs: (val: IFaq[]) => {
          this.properties.faqs = val;
          this.onPropertyPaneFieldChanged("faqs", null, val);
          this.render();
        },

        SelectedItemId: this.SelectedItemId,
        setSelectedItemId: (id: string) => {
          this.SelectedItemId = id;
          if (this.context.propertyPane.isPropertyPaneOpen()) {
            this.context.propertyPane.refresh();
          } else {
            this.context.propertyPane.open();
          }
          this.render();
        },
        allowZeroExpanded: this.properties.allowZeroExpanded,
        allowMultipleExpanded: this.properties.allowMultipleExpanded,
        displayMode: this.displayMode
      });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected updateSearchStrings(): void {
    this.properties.faqsSearchableQuestions = '';
    this.properties.faqsSearchableAnswers = '';
    this.properties.faqs.forEach((faq: IFaq) => {
      if (faq.Question)
        this.properties.faqsSearchableQuestions += ' ' + faq.Question;
      if (faq.Answer)
        this.properties.faqsSearchableAnswers += ' ' + faq.Answer;
    })
  }

  /* ------------------------------------------------------------ */
  /* --------------------- Properties Panel --------------------- */
  /* ------------------------------------------------------------ */

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.updateSearchStrings();
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const propertyPaneGroups: IPropertyPaneGroup[] = []

    if (this.SelectedItemId) {
      const index = this.properties.faqs.map(x => x.Id).indexOf(this.SelectedItemId);
      propertyPaneGroups.push({
        groupFields: [
          PropertyPaneTextField(`faqs[${index}].Question`, {
            label: "Question"
          }),
          PropertyPaneTextField(`faqs[${index}].Answer`, {
            label: "Answer",
            multiline: true,
            rows: 10
          }),
          PropertyPaneButton('', {
            text: "Delete",
            icon: "Delete",
            onClick: () => {
              this.properties.faqs = this.properties.faqs.filter(x => x.Id !== this.SelectedItemId);
              this.onPropertyPaneFieldChanged("faqs", null, this.properties.faqs);
              this.SelectedItemId = null;
              this.context.propertyPane.refresh();
              this.render();
            }
          }),
          // PropertyPaneButton('', {
          //   text: "Close",
          //   icon: "Cancel",
          //   onClick: () => {
          //     this.SelectedItemId = null!;
          //     this.context.propertyPane.refresh();
          //     this.render();
          //   }
          // })
        ]
      })
    }

    propertyPaneGroups.push({
      groupName: "Layout options",
      groupFields: [
        PropertyPaneToggle("allowZeroExpanded", {
          label: "Allow Zero Expanded",
          checked: this.properties.allowZeroExpanded,
          key: "allowZeroExpanded",
        }),
        PropertyPaneToggle("allowMultipleExpanded", {
          label: "Allow Multiple Expanded",
          checked: this.properties.allowMultipleExpanded,
          key: "allowMultipleExpanded",
        })
      ]
    })

    return {
      pages: [
        {
          header: { description: "Edit FAQs" },
          groups: propertyPaneGroups
        }
      ]
    };
  }
}