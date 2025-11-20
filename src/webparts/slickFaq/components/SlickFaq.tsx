import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder, WebPartTitle } from '@pnp/spfx-controls-react';
import { ActionButton, getTheme } from 'office-ui-fabric-react';
import { Util } from '../Util/Util';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import styles from './SlickFaq.module.scss';
import "./reactAccordion.css";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';

export interface ISlickFaqProps {
  webPartTitle: string;
  setWebpartTitle: (val: string) => void;
  faqs: IFaq[];
  setFaqs: (val: IFaq[]) => void;
  SelectedItemId: string,
  setSelectedItemId: (id: string) => void;
  allowZeroExpanded: boolean;
  allowMultipleExpanded: boolean;
  displayMode: DisplayMode;
}

export interface IFaq {
  Id: string;
  Question: string;
  Answer: string;
  SortWeight: number;
}

export const SlickFaq: React.FunctionComponent<ISlickFaqProps> = (props: React.PropsWithChildren<ISlickFaqProps>) => {
  const { webPartTitle, setWebpartTitle, setFaqs, SelectedItemId, setSelectedItemId, allowZeroExpanded, allowMultipleExpanded, displayMode } = props;
  const faqs = props.faqs ? props.faqs : [];
  const theme = getTheme();

  const AddFaq = (): void => {
    setFaqs([...faqs, {
      Id: Util.GenerateId(),
      SortWeight: Util.CalculateNewSortWeight(faqs, faqs.length),
      Question: "Click to edit FAQ",
      Answer: ""
    }]);
  }

  const SortableItem = SortableElement(({ item }: { item: IFaq }) => (
    <AccordionItem key={item.Id} onClick={displayMode === DisplayMode.Edit && (() => setSelectedItemId(item.Id))}>
      <AccordionItemHeading style={SelectedItemId === item.Id ? { color: theme.palette.themeSecondary } : { color: 'inherit' }}>
        <AccordionItemButton title={item.Question}>
          {item.Question}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p
          dangerouslySetInnerHTML={{
            __html: item.Answer,
          }}
        />
      </AccordionItemPanel>
    </AccordionItem>
  ));

  const SortableList = SortableContainer(({ faqs }: { faqs: IFaq[] }) => (
    <div>
      {displayMode === DisplayMode.Read &&
        faqs.map((item, index) => (
          <SortableItem
            key={`${item.Id}`}
            index={index}
            item={item}
            disabled={true}
          />
        ))}
      {displayMode === DisplayMode.Edit &&
        faqs.map((item, index) => (
          <SortableItem
            key={`${item.Id}`}
            index={index}
            item={item}
          />
        ))}
    </div>

  ));

  const UpdateSortIndex = (indexToMove: number, newIndex: number): void => {
    const arr = [...faqs].sort((a, b) => a.SortWeight - b.SortWeight);
    const res = Util.CalculateNewSortWeight(faqs, newIndex, indexToMove);
    if (arr[indexToMove].SortWeight !== res) {
      arr[indexToMove].SortWeight = res;
      setFaqs(arr);
    }
  }

  const faqsPresent: boolean = faqs !== undefined && faqs.length > 0;
  return (
    <section className={`${styles.slickFaq}`}>
      {!faqsPresent && (
        <Placeholder
          iconName="DiffInline"
          iconText="Build your FAQ webpart"
          description="Enter questions/answers to be rendered in a collapsible accordion format."
          buttonLabel="Add an FAQ"
          onConfigure={AddFaq}
        />
      )}
      {faqsPresent && (
        <div>
          <WebPartTitle
            displayMode={displayMode}
            title={webPartTitle}
            updateProperty={setWebpartTitle}
          />
          {displayMode === DisplayMode.Edit && <ActionButton iconProps={{ iconName: "Add" }} onClick={() => AddFaq()} >Add link</ActionButton>}
          <Accordion
            allowZeroExpanded={allowZeroExpanded}
            allowMultipleExpanded={allowMultipleExpanded}
          >
            <SortableList
              faqs={[...faqs].sort((a, b) => a.SortWeight - b.SortWeight)}
              axis="y"
              lockAxis="y"
              distance={25}
              onSortEnd={sort => UpdateSortIndex(sort.oldIndex, sort.newIndex)}
            />
          </Accordion>
        </div>
      )}
    </section>
  );

};