import { IFaq } from "../components/SlickFaq";

export class Util {
    public static GenerateId(): string {
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        return uniqueId;
    }

    public static CalculateNewSortWeight(arr: IFaq[], newIndex: number, oldIndex?: number):number {
        const links = arr ? [...arr].sort((a, b) => a.SortWeight - b.SortWeight) : [];
        if (newIndex === 0)
            return this.GetAverage(null, links[0]?.SortWeight);
        if (newIndex === links.length)
            return this.GetAverage(links[links.length - 1].SortWeight, null);
        if (newIndex < oldIndex)
            return this.GetAverage(links[newIndex - 1]?.SortWeight, links[newIndex]?.SortWeight)
        return this.GetAverage(links[newIndex]?.SortWeight, links[newIndex + 1]?.SortWeight)
    }

    private static GetAverage(prev: number, next: number):number {
        prev = isNaN(prev) || prev === null ? 0 : prev;
        next = isNaN(next) || next === null ? 1 : next;
        return (prev + next) / 2
    }
}