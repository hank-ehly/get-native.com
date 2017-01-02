## Saving

When you save a transcript, you also save the collocations within that script.
You enter the transcript text, and add 'markers' where you want to register collocations.


Text entered:
```text
It's {pretty cool}. It's {pretty cool how you did that}.
```

You would then click 'save.' The server-side application then does the following:

1. For each pair of '{}' it does the following for the text within the curly-braces
2. Check if a collocation with that exact text already exists in the database
3. If a collocation exists, replace it with it's unique ID (eg. {pretty cool} becomes {1184})
4. If no exact matches are found, a new collocation gets saved, and the previous step is applied

You'll end up with transcript text like:

```text
It's {8365}. It's {1092}.
```

By taking this approach, you eliminate the possibility that the collocation 'pretty cool' is accidentally recognized more than once.

## Displaying

The client receives text like the following:
 
```text
It's {8365}. It's {1092}.
```

The client reads the collocations and their IDs from the API response and does the following:

1. Wraps each collocation in a `<span class="collocation">` tag.
2. Sets the 'id' attribute of the `<span>` tag to the collocation's unique ID.
3. Inserts the `<span>` tag into the transcript in place of the unique ID marker.

In the end, you should end up with transcript HTML like the following:

```html
It's <span id="8365" class="collocation">pretty cool</span>. 
It's <span id="1092" class="collocation">pretty cool how you did that</span>.
```