import { Dispatch, CurrentUserState } from '@app/store';

interface MapDispatchToProps {
  login: (user: CurrentUserState) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  login: dispatch.currentUser.login,
});
