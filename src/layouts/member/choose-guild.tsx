import { CUSTOM_MODAL_COMPONENT_PROPS, MaterialSelect } from "src/components";
import { useActions, useAuth } from "src/hooks";

export const ChooseGuild: React.FC<CUSTOM_MODAL_COMPONENT_PROPS> = ({ onCancel }) => {

    const { data } = useAuth();
    const { authActions } = useActions();

    const handleGuildChange = (guild) => {
        authActions.updateAuthData({ guild });
        onCancel();
    };

    return (
        <div>
            <MaterialSelect
                value={data.guild}
                options={data.guilds}
                isString
                placeholder="Choose a Guild"
                label="Choose a Guild"
                containerProps={{ size: "small", sx: { width: "200px" } }}
                onChange={handleGuildChange}
            />
        </div>
    );
};
