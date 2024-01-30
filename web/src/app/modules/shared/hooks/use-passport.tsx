import { useCallback, useEffect, useState } from 'react';
import { useProvider } from '../providers';
import { atom, useAtom } from 'jotai';

const loadingAtom = atom<boolean>(false);
const userAtom = atom<any>(null);
const authenticatedAtom = atom<boolean>(false);

export function usePassport() {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [user, setUser] = useAtom(userAtom);
  const [authenticated, setAuthenticated] = useAtom(authenticatedAtom);
  const { passport } = useProvider();

  const fetchUser = useCallback(async () => {
    try {
      const user = await passport.getUserInfo();

      if (!user) {
        setAuthenticated(false);
        return;
      }
      setUser(user);
      setAuthenticated(true);
    } catch (e) {
      setAuthenticated(false);
    }
  }, [passport]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await passport.logout();
      await fetchUser();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [fetchUser, passport]);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      await passport.login();
      await fetchUser();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [fetchUser, passport]);

  const loginCallback = async () => {
    try {
      await passport.loginCallback();
      await fetchUser();
    } catch (e) {
      console.error(e);
    }
  };

  const logoutCallback = async () => {
    try {
      await passport.logoutSilentCallback('/');
    } catch (e) {
      console.error(e);
    }
  };

  return {
    loading,
    setLoading,
    user,
    authenticated,
    setAuthenticated,
    fetchUser,
    login,
    loginCallback,
    logout,
    logoutCallback,
  };
}
