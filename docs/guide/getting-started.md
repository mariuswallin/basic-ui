# Getting started

First, install the component library.

```bash
npm install @sifferhans/basic-ui
```

## Usage

Import only the components you need, where you need them.

```vue{2,10-14}
<script setup lang="ts">
import { Button, Input, Form } from '@sifferhans/basic-ui'

function handleSubmit(data: FormData) {
  // ...
}
</script>

<template>
  <Form @submit="handleSubmit">
    <Input label="Name" placeholder="John Doe" />
    <Input label="E-mail" placeholder="john@doe.com" />
    <Button type="submit">Submit</Button>
  </Form>
</template>
```