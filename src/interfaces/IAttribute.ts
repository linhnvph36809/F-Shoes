export type Variant = {
    id: string | number;
    value: string;
};
export interface IAttribute {
    id: string | number;
    name: string;
    values: Variant[];
}
