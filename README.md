# h1-bulma

> HeartOne

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


### Bulma Customisation

In order to customise bulma scss the following seems to work:

Install [Nuxt Bulma module](https://github.com/nuxt-community/modules/tree/master/packages/bulma)

To create custom sass need these:

```bash
npm install --save-dev node-sass sass-loader
```

Create `~/assets/styles/custom.scss`

```scss
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";

$blue: #106BD9;
$primary: $blue;
$red: #FF0D22;

$navbar-item-active-color: $blue;

// justify content p text on mobiles
.content p {
  @extend .has-text-justified-mobile;
}

@import "~bulma/bulma";
```

The last line above loads the main bulma styles. Then need to comment out the module in `nuxt.config.js.OFF`
as it overrides custom values with defaults.

```javascript
{
  modules: [
    '@nuxtjs/bulma'
  ]
}
```

This seems convoluted and I'm sure I'm missing something. Obviously don't actually need the Bulma module 
with this setup as it is not being used. Could simply install bulma alone.

Some more info here: http://bgraphic.no/using-bulma-font-awsome-nuxt/


  



