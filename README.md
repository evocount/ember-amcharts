[![Build Status](https://travis-ci.org/evocount/ember-amcharts.svg?branch=master)](https://travis-ci.org/evocount/ember-amcharts)
[![Ember Observer Score](https://emberobserver.com/badges/ember-amcharts.svg)](https://emberobserver.com/addons/ember-amcharts)
[![npm version](https://badge.fury.io/js/ember-amcharts.svg)](https://badge.fury.io/js/ember-amcharts)

# ember-amcharts

Use [amCharts 4](https://www.amcharts.com/) in Ember in a declarative way.

- Dynamic (lazy) imports
- Declarative interface using contextual components
- Close to original amCharts API

## Table of contents

- [Compatibility](#compatibility)
- [Installation](#installation)
- [Usage](#usage)
  - [Components](#components)
      - [AmChart](#amchart)
    - [AmChartProperty](#amchartproperty)
    - [AmChartOn](#amcharton)
    - [AmChartCall](#amchartcall)
  - [AmChartPush](#amchartpush)
  - [Helpers](#helpers)
    - [am-chart-theme](#am-chart-theme)
    - [am-chart-obj](#am-chart-obj)
  - [Locales](#locales)
- [Contributing](#contributing)
- [License](#license)

## Compatibility

- Ember.js v3.13 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-amcharts
```

## Usage

```hbs
<AmChart
  @themes={{array (am-chart-theme "material")}}
  @chartType="XYChart"
  @initialConfig={{this.jsonConfig}}
  as |chart|
>
  <chart.property @property="exporting.menu" @value={{am-chart-obj chart.am4core "ExportMenu"}} />

  <chart.push @property="yAxes" @value={{am-chart-obj chart.am4charts "CategoryAxis"}} as |axis|>
    <axis.property @property="title.text" @value="Stuff" />
  </chart.push>

  {{#if this.triggerExport}}
    <chart.call @obj={{this.chart}} @property="exporting.export" @params={{array "png"}} />
  {{/if}}
</AmChart>
```

### Components

##### AmChart

Creates the amChart.

Properties:

- `chartType`: Name of chart type class (e.g. `PieChart`, `XYChart`, …)
- `initialConfig`: Object containing [JSON-based config](https://www.amcharts.com/docs/v4/concepts/json-config/). This is only used during construction or when the chart type changes, but otherwise updates will have no effect.
- `themes`: Optional. List of themes

Yields hash(once the chart loaded):

- `instance`: amChart chart instance
- `am4core`: am4core module
- `am4charts`: am4charts module
- `property`: `AmChartProperty` as contextual component (setting `obj`)
- `on`: `AmChartOn` as contextual component (setting `obj`)
- `call`: `AmChartCall` as contextual component (setting `obj`)
- `push`: `AmChartPush` as contextual component (setting `obj`)

#### AmChartProperty

Manages property value, e.g.

```hbs
<AmChartProperty @obj={{this.chart}} @property="responsive.enabled" @value={{true}} />
```

translates to the following amChart code:

```js
chart.responsive.enabled = true;
```

When the component is removed from the template it will restore the original state by disposing the
given value or setting the original value again.

Properties:

- `obj`: Container obj
- `property`: Path to property to set
- `value`: Value to set

Limitations:

- While changes to `obj`, `property` and `value` will be correctly applied, only the value at the original combination `obj` / `property` is restored upon component destruction.

#### AmChartOn

Registers action to event dispatcher.

This call

```hbs
<AmChartOn
  @obj={{this.series}}
  @property="columns.template"
  @event="hit"
  @action={{fn this.onColumnClick}}
/>
```

translates to the following amChart code:

```js
series.columns.template.events.on("hit", function(ev) { … })
```

Properties:

- `obj`: Container obj
- `property`: Path to property with event dispatcher
- `event`: Event name
- `action`: Event handler
- `once`: Optional. Boolean indicating whether to subscribe to `on` (default) or to `once`.

#### AmChartCall

Calls function. Parameter updates will cause the function to be called again.

```hbs
<AmChartCall
  @obj={{this.chart}}
  @property="exporting.export"
  @params={{array "png"}}
/>
```

translates to

```js
chart.exporting.export("png");
```

Parameters:

- `obj`: Container obj
- `func`: Path to function
- `params`: List of positional parameters

Yields:

- return value of function call

### AmChartPush

Pushes value into list. Tries to dispose its work upon recomputation with changed `obj`/`property` params or upon destruction.

Parameters:

- `obj`: container obj
- `property`: Path to array
- `value`: Value to push into array

Yields hash:

- `value`: Return value of `push` (amChart's `push` returns the value pushed)
- `property`: `AmChartProperty` as contextual component (setting `obj`)

### Helpers

#### am-chart-theme

Imports (dynamic import) amChart theme for usage in `AmChart` component. Takes name of theme as single positional parameter.

#### am-chart-obj

Creates new instance of specified class. Takes positional parameters `container`, `name`. Additional positional parameters are applied to constructor.

### Locales

To avoid having to bundling every locale a blueprint is provided to aid with dynamic importing of amChart locales:

`ember generate am-chart-locale-importer fr_FR de_DE en_US`

will generate a helper named `am-chart-locale` to be used like this:

```hbs
<chart.property @property="language.locale" @value={{am-chart-locale "de_DE"}} />>
```

For a list of all all locales bundled with amCharts check [here](https://github.com/amcharts/amcharts4/tree/master/src/lang).

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
