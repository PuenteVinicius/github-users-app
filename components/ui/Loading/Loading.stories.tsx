// components/ui/Loading/Loading.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "UI/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Um componente de loading com spinner animado e mensagem opcional. Pode ser mostrado ou ocultado através da prop `show`.",
      },
    },
  },
  argTypes: {
    show: {
      control: "boolean",
      description: "Controla se o loading é exibido ou não",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais para personalização",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    message: {
      control: "text",
      description: "Mensagem de texto exibida abaixo do spinner",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story básico
export const Default: Story = {
  args: {
    show: true,
    message: "Carregando...",
  },
};

// Loading sem mensagem
export const WithoutMessage: Story = {
  args: {
    show: true,
    message: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Loading exibido sem mensagem de texto, apenas o spinner.",
      },
    },
  },
};

// Loading com mensagem longa
export const WithLongMessage: Story = {
  args: {
    show: true,
    message: "Processando sua solicitação, por favor aguarde...",
  },
  parameters: {
    docs: {
      description: {
        story: "Loading com uma mensagem mais longa e descritiva.",
      },
    },
  },
};

// Loading oculto
export const Hidden: Story = {
  args: {
    show: false,
    message: "Esta mensagem não deve aparecer",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Componente de loading com `show=false` - não deve renderizar nada.",
      },
    },
  },
};

// Loading com classe personalizada
export const WithCustomClass: Story = {
  args: {
    show: true,
    className: "bg-gray-800 p-8 rounded-lg",
    message: "Loading personalizado",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Loading com classes CSS personalizadas para estilização adicional.",
      },
    },
  },
};

// Loading em contexto de uso real
export const InContext: Story = {
  args: {
    show: true,
    message: "Buscando usuários do GitHub...",
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 rounded-xl min-w-80">
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold">
            Lista de Usuários
          </h3>
          <p className="text-gray-400 text-sm">
            Aguarde enquanto carregamos os dados...
          </p>
        </div>
        <div className="flex justify-center py-8">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo do componente Loading sendo usado em um contexto real de aplicação.",
      },
    },
  },
};

// Variações de mensagem
export const DifferentMessages: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div className="text-center">
        <h4 className="text-white mb-4">Processando dados...</h4>
        <Loading {...args} message="Processando dados..." />
      </div>
      <div className="text-center">
        <h4 className="text-white mb-4">Salvando alterações</h4>
        <Loading {...args} message="Salvando alterações..." />
      </div>
      <div className="text-center">
        <h4 className="text-white mb-4">Conectando ao servidor</h4>
        <Loading {...args} message="Conectando ao servidor..." />
      </div>
    </div>
  ),
  args: {
    show: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Diferentes variações de mensagens para o componente Loading.",
      },
    },
  },
};

// Estados interativos
export const Interactive: Story = {
  args: {
    show: true,
    message: "Loading interativo - altere os controles!",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use os controles do Storybook para alterar as propriedades do Loading em tempo real.",
      },
    },
  },
};

// Loading para diferentes tamanhos
export const SizeVariations: Story = {
  render: (args) => (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h4 className="text-white mb-4">Pequeno</h4>
        <Loading {...args} className="scale-75" message="Loading pequeno" />
      </div>
      <div className="text-center">
        <h4 className="text-white mb-4">Normal</h4>
        <Loading {...args} message="Loading normal" />
      </div>
      <div className="text-center">
        <h4 className="text-white mb-4">Grande</h4>
        <Loading {...args} className="scale-150" message="Loading grande" />
      </div>
    </div>
  ),
  args: {
    show: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplos do componente Loading em diferentes tamanhos usando transform scale.",
      },
    },
  },
};

// Loading em modo escuro/claro
export const DarkLightTheme: Story = {
  render: (args) => (
    <div className="flex space-x-8">
      <div className="bg-gray-900 p-6 rounded-lg">
        <h4 className="text-white mb-4 text-center">Modo Escuro</h4>
        <Loading {...args} message="No modo escuro" />
      </div>
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="text-gray-900 mb-4 text-center">Modo Claro</h4>
        <Loading
          {...args}
          className="[&_svg]:fill-blue-600 [&_span]:text-gray-900"
          message="No modo claro"
        />
      </div>
    </div>
  ),
  args: {
    show: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de como o Loading se adapta a diferentes temas (claro/escuro).",
      },
    },
  },
};
