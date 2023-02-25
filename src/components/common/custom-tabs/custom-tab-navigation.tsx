import { useState, useEffect, ReactElement } from 'react';
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { TabProps } from '@mui/material/Tab';
import { appendSearchString, getSearchQuery, isNumericValue } from 'src/utils';
import { useLocation, useNavigate } from 'react-router-dom';

export interface CUSTOM_TABS_PROPS extends Omit<TabsProps, 'children'> {
    initialActiveTabIndex?: number | string;
    // children?: ReactElement<TabsProps> //'children' prop expects a single child of type
    children?: ReactElement<TabsProps>[] | ReactElement<TabProps>; // reference - https://stackoverflow.com/a/49408900/13686747
}

export const CustomTabNavigation: React.FC<CUSTOM_TABS_PROPS> = (props) => {

    const { search, pathname } = useLocation();
    const { tab: currentActiveTab } = getSearchQuery(search) || {};
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string | number>(0);

    useEffect(() => {
        if(currentActiveTab !== undefined)
            setActiveTab(parseInt(`${props.initialActiveTabIndex || 0}`));
    }, []);

    useEffect(() => {
        let initialActiveTabIndex: number | string = 0;
        if(isNumericValue(props.initialActiveTabIndex)) {
            initialActiveTabIndex = props.initialActiveTabIndex;
        }
        setActiveTab(parseInt(`${currentActiveTab === undefined ? initialActiveTabIndex : currentActiveTab}`));
    }, [currentActiveTab]);

    const handleTabChange = (_event, newIndex) => {
        navigate(`${pathname}?${appendSearchString([search, { tab: newIndex }])}`);
    };

    return (
        <Tabs {...props} value={parseInt(`${activeTab}`)} onChange={handleTabChange}>
            {props.children}
        </Tabs>
    );

};