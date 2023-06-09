export * from './header-default';

export interface INavigationItem {
  id?: number | string;
  title: string;
  description?: string;
  href: string;
  icon?: string;
  childs?: Omit<INavigationItem, 'childs'>[];
}
export type INavgationList = Array<Omit<INavigationItem, 'childs'> & { childs?: INavigationItem[] } & Record<string, any>>;
