module.exports = ({env}) => ({
  email: {
    provider: 'sendinblue',
    providerOptions: {
      sendinblue_api_key: env('SIB_API_KEY', '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'),
      sendinblue_default_replyto: env('SIB_DEFAULT_REPLY_TO', 'no-reply@simpleaccounts.io'),
      sendinblue_default_from: env('SIB_DEFAULT_FROM', 'no-reply@simpleaccounts.io'),
      sendinblue_default_from_name: env('SIB_DEFAULT_FROM_NAME', 'SimpleAccounts'),
    },
  },
});
