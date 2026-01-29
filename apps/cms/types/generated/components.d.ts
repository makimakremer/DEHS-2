import type { Attribute, Schema } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adressen';
  info: {
    description: 'Adressdaten f\u00FCr Rechnungs- und Lieferadressen';
    displayName: 'Adresse';
  };
  attributes: {
    ansprechpartner: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    firma: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    hausnummer: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    land: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }> &
      Attribute.DefaultTo<'Deutschland'>;
    ort: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    plz: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    strasse: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    zusatz: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface ProduktTechnischeDaten extends Schema.Component {
  collectionName: 'components_produkt_technische_daten';
  info: {
    description: 'Technische Spezifikationen eines Produkts';
    displayName: 'Technische Daten';
  };
  attributes: {
    bezeichnung: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    einheit: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    gruppe: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    wert: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'adresse.adresse': AdresseAdresse;
      'produkt.technische-daten': ProduktTechnischeDaten;
    }
  }
}
