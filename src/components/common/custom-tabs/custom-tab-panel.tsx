export interface CUSTOM_TAB_PANEL_PROPS {
    children?: React.ReactNode;
    dir?: string;
    index?: number;
    value?: number | string;
  }
export const CustomTabPanel: React.FC<CUSTOM_TAB_PANEL_PROPS> = (props) => {
    const { children, value, index, ...rest } = props;

    return (
      <div
        role="tabpanel"
        // hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...rest}
      >
        {(parseInt(`${value || 0}`) === parseInt(`${index || 0}`)) && children}
      </div>
    );
  };
