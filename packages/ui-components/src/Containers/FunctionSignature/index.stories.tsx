import FunctionSignature from '#ui/Containers/FunctionSignature';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof FunctionSignature>;
type Meta = MetaObj<typeof FunctionSignature>;

export const Default: Story = {
  args: {
    title: 'Attributes',
    items: [
      {
        name: 'streams',
        type: (
          <>
            <a href="#">&lt;Stream[]&gt;</a>|<a href="#">&lt;Iterable[]&gt;</a>|
            <a href="#">&lt;AsyncIterable[]&gt;</a>|
            <a href="#">&lt;Function[]&gt;</a>
          </>
        ),
      },
      {
        name: 'options',
        optional: true,
        type: <a href="#">&lt;Object&gt;</a>,
        children: [
          {
            name: 'Signal',
            type: <a href="#">&lt;AbortSignal&gt;</a>,
          },
          {
            name: 'end',
            type: <a href="#">&lt;boolean&gt;</a>,
            description: (
              <>
                End the destination stream when the source stream ends.
                Transform streams are always ended, even if this value is&nbsp;
                false.<strong>Default:</strong> true.
              </>
            ),
          },
        ],
      },
      {
        name: 'Returns',
        type: <a href="#">&lt;Promise&gt;</a>,
        description: 'Fulfills when the pipeline is complete.',
        kind: 'return',
      },
    ],
  },
};

export const Nested: Story = {
  args: {
    title: 'Attributes',
    items: [
      {
        name: 'source',
        type: (
          <>
            <a href="#">&lt;Stream&gt;</a>|<a href="#">&lt;Iterable&gt;</a>|
            <a href="#">&lt;AsyncIterable&gt;</a>|
            <a href="#">&lt;Function&gt;</a>
          </>
        ),
        children: [
          {
            name: 'attribute1',
            type: <a href="#">&lt;Attribute1&gt;</a>,
          },
          {
            name: 'attribute2',
            type: <a href="#">&lt;Attribute2&gt;</a>,
          },
          {
            name: 'attribute3',
            type: <a href="#">&lt;Attribute3&gt;</a>,
          },
          {
            name: 'Returns',
            kind: 'return',
            description: 'description',
            type: (
              <>
                <a href="#">&lt;Promise&gt;</a>|
                <a href="#">&lt;AsyncIterable&gt;</a>
              </>
            ),
          },
        ],
      },
      {
        name: '...transforms',
        type: (
          <>
            <a href="#">&lt;Stream&gt;</a>|<a href="#">&lt;Function&gt;</a>
          </>
        ),
        children: [
          {
            name: 'source',
            description: 'description',
            type: <a href="#">&lt;AsyncIterable&gt;</a>,
            children: [
              {
                name: 'Returns',
                kind: 'return',
                description: 'description',
                type: (
                  <>
                    <a href="#">&lt;Promise&gt;</a>|
                    <a href="#">&lt;AsyncIterable&gt;</a>
                  </>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
};

export const ReturnType: Story = {
  args: {
    items: [
      {
        name: 'Returns',
        type: <a href="#">&lt;Promise&gt;</a>,
        description: 'Fulfills when the pipeline is complete.',
        kind: 'return',
      },
    ],
  },
};

export const HasOnlyTypeDefinition: Story = {
  args: {
    title: 'Type',
    items: [
      {
        type: <a href="#">&lt;Promise&gt;</a>,
        description: 'A simple type definition.',
      },
    ],
  },
};

export default {
  component: FunctionSignature,
} as Meta;
