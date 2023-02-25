import { actions as reduxActions } from "src/redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "src/redux";

export function useActions() {
  type actionsType = typeof reduxActions;
  const reduxActionsCopy: any = { ...reduxActions };
  const dispatch = useDispatch();
  // #rbac-setup
  let actions: any = {};
  Object.keys(reduxActions).forEach((el: any) => {
    actions[el] = bindActionCreators(reduxActionsCopy[el], dispatch);
  });

  return actions as actionsType;
}
