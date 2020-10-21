# Picker

Picker is a "multi choice management system" in the spirit of `react-table`; it allows 
you to pick the visual display of the container, wrapper, and items however you want, 
and gives you access to the store and its'  current value through context. 

## The Picker Store

The picker store is an instance of Looking Glass Engine; it has the following 

### Values

the following values are available from the store's `my` property,
and are the values of the `value` object in context.

```
store.my.options {[string/Object]} -- either strings, or objects with a label property
store.my.choices {[same types as options]} -- the selected items from options
store.my.display {boolean} whether to show the options container
```

## Actions

These methods are available from the context

```
store.do.setOptions([...]) update the options that can be displayed
store.do.setChoices([...]) update the current choices
store.do.toggleDisplay() show (or hide) the options
store.do.toggleChoice(option) add (or remove) an option to the choices
store.do.addAll(store) select all options
store.do.remAll(store) select no options/clear choices
store.do.setComparator({isEqual}) define how identity is tested in your component
```

# the Picker Component

The Picker component displays options passed in through its options property,
via the Container, and whatever you put in as its children property; children
have access to a unique Store instance (see above) and its values, via the ChoiceContext. 

It has the following properties; all are optional

```
Picker.propTypes = {
  ChoiceContainer: a function or React component that encases all the options.
                   It's only displayed when store.my.display is true. If absent,
                   the built-in ChoiceContainer component is used. 
  ChoiceItem: a function or React component that displays an individual option. 
              If absent, the build in ChoiceItem is used. 
  options: an array of choices - either strings, or objects with a label property. 
  onChoices: a function that is called every time the users' choices change.
  onStore: a callback to access the store from outside the Picker; also gives 
           the ability to add actions to the store with store.action(name, fn)
           or properties via store.set(name, value)
};
```

## Identity in the Picker Component

An option is considered chosen when one of the choices is `equal` to it. It uses
the `store.my.comparator.isEqual` function; by default, equal to `lodash.isequal`. 

If you want a more specific comparator, such as comparing options' ID properties,
update the comparator. 

## The Pick

There are **NO** form elements by default; picker items are passed these properties:
 
 * active, a boolean property that indicates whether or not the option is in the choice collection
 * children -- the display text that identifies the item; can be a complex HTML item or a simple string
 
 ...and when the item is clicked then active toggles. The item is responsible for 
 changing its appearance based on the active property; the default ChoiceItem 
 shows an SVG Checkbox checked when an item is selected but any other css style you 
 want to use to effect a selection indicator is fine. 
 
 note - the click handler and active passthrough are accomplished via the ChoiceContainer; if 
 you have your own container, you have to accomplish these actions yourself. 

## Customizing ChoiceItem

you can define how items look by passing a component to the picker named `ChoiceItem`; it 
can recieve 
* onClick - a handler that toggles the options' inclusion in the choices array
* option
* children (the option's label, or itself if it's a string)
* active

It doesn't get passed the store , but that can be extracted via ChoiceContext.

If you want to manage selection you can put your own onClick receiver in your ChoiceItem
component; just cancel the event's propagation to avoid triggering the outer onClick handler. 

The CheckOn/CheckOff icons that ChoiceItem provides by default are easily replaceable
by a custom containers' UI. 

## Customizing ChoiceContainer

If you simply must change how the `ChoiceContainer` operates you can override it as a 
property of Picker. Keep in mind you'll have to clone or in some other way affect the 
operation of the stock ChoiceContainer, displaying the options and hooking onClick
to the stores' `toggleChoice` action. 

ChoiceContainer is not a dropdown by default -- it's a "Push down" that appears below
the children when its activated by setting display to true. You can change that by 
defining the css qualities of the `.picker__container` css class. 

# ChoiceContext 

The store, and its values, are provided/updated through a context: `ChoiceContext`. 
This is a standard React Context that provides an object: 

```
{
   value: {Object}
   store: {LGE Store}
}
```

value is a clone of `store.my`; see above for a catalog of its properties. 
