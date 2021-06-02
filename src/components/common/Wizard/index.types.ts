/// TYPES
export type IWizardProps = {
  dataSource: IWizardDataSourceItem[];
};

export type ITabPanelProps = {
  dir?: string;
  index: number;
  value: number;
  data?: IWizardDataSourceItem;
};

export type IWizardDataSourceItem = {
  title: string;
  component: JSX.Element;
  description: string;
};
/// TYPES END
