export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d",
      },
      register: {
        allowedFields: [
          "firma",
          "anrede",
          "vorname",
          "nachname",
          "telefon",
          "ustIdNr",
        ],
      },
    },
  },
  i18n: {
    config: {
      defaultLocale: "de",
      locales: ["de"],
    },
  },
});
