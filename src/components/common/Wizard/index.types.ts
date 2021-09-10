/// TYPES
export type IWizardProps = {
  footer?: JSX.Element;
  onSubmit?: () => void;
  onChange?: (currentStep: number) => void;
  activeStep?: number;
  dataSource: IWizardDataSourceItem[];
  disabledButton?: boolean;
};

export type IStepPanelProps = {
  dir?: string;
  index: number;
  totalSteps: number;
  data?: IWizardDataSourceItem;
};

export type IWizardDataSourceItem = {
  title: string;
  component: JSX.Element;
  description: string;
};
/// TYPES END
