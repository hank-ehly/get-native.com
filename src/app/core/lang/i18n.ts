/**
 * i18n
 * getnativelearning.com
 *
 * Created by henryehly on 2017/12/17.
 */

export const i18n = {
    ErrorMessage: {
        CheckConnection: {
            en: 'Please check your internet connection.',
            ja: 'インターネット接続を確認してください。'
        },

        ServerError: {
            en: 'An unexpected server error has occurred. Please try again later.',
            ja: 'サーバー側で予想外のエラーが起きました。お手数ですが、少し時間を置いてから再度実行してください。'
        },

        SessionExpired: {
            en: 'Your session has been inactive for over 1 hour. Please login again to continue browsing.',
            ja: '1時間以上動きがありませんでしたので、自動ログアウトされました。お手数ですが、もう一度ログインしてください。'
        },

        UnknownError: {
            en: 'An unknown error has occurred. Please try again later.',
            ja: '予想外のエラーが発生しました。お手数ですが、少し時間を置いてから再度実行してください。'
        }
    },

    SuccessMessage: {
        AccountDeleted: {
            en: 'Your account has been deleted.',
            ja: 'アカウントが削除されました。'
        }
    }
};
