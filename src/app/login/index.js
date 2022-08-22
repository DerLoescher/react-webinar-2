import React, { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-components/layout-flex";
import Layout from "../../components/layout-components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginAuth from "../../components/login-auth";
import useSelector from "../../hooks/use-selector";
import LoginBoard from "../../containers/login-board";
import { useNavigate } from "react-router-dom";

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    async () => {
      await store.get("login").authCheck();
    },
    [],
    { backForward: true }
  );

  const select = useSelector((state) => ({
    isAuth: state.login.isAuth,
    isLoading: state.login.isLoading,
    error: state.login.error,
  }));

  useEffect(() => {
    if (select.isAuth) {
      navigate(-1, { replace: true });
    }
  }, [select.isAuth]);

  const callbacks = {
    onAuth: useCallback(
      (login, password) => store.get("login").auth(login, password),
      []
    ),
  };

  const { t } = useTranslate();

  return (
    <Layout
      preHead={<LoginBoard />}
      head={
        <LayoutFlex flex="between">
          <h1>{t("title")}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <LoginAuth error={select.error} onAuth={callbacks.onAuth} t={t} />
    </Layout>
  );
}

export default React.memo(Login);
