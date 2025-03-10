import {BudgetPeriod} from "./budget-period.enum";

export interface IBudget {
    limit: number;
    accounts: string[],
    period: BudgetPeriod;
    categories?: string[];
    tags?: string[];
    title: string;
}