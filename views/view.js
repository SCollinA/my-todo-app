const page = function(content) {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    ${content}
  </body>
</html>
`}

const list = function(items) {
   itemNames = items.map(item).join('')
   return `
    <ul>
      ${itemNames}
    </ul>
   `
}

const item = function(item) {
  return `
    <li>${item.name}</li>
  `
}

module.exports = {
  page,
  list
}