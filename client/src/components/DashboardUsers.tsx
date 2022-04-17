import { Dispatch, FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../actions/user.actions";
import { FormUserContext } from "../contexts/formUser.context";
import { IUser } from "../interfaces/user.interfaces";
import { RootState } from "../store";
import TableUser from "./TableUser";
import UsersForm from "./UsersForm";

interface DashBoardUsersProps {}

const DashBoardUsers: FC<DashBoardUsersProps> = () => {
  const { handleClear, handleUpdate, handleSubmit } =
    useContext(FormUserContext);

  const dispatch: Dispatch<any> = useDispatch();

  const selectorUsers: Array<IUser> = useSelector(
    (state: RootState) => state.users
  ).users;

  const deleteAction = (id: string, active: boolean) => {
    if (!id) return;
    dispatch(deleteUserAction(id, active));
  };

  return (
    <>
      <UsersForm handleClear={handleClear} handleSubmit={handleSubmit} />
      <TableUser
        selectorUsers={selectorUsers}
        handleUpdate={handleUpdate}
        deleteAction={deleteAction}
      />
    </>
  );
};

export default DashBoardUsers;
