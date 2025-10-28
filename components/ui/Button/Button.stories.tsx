// components/ui/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Um componente de botão reutilizável com estados de hover, focus e disabled. Ideal para ações principais na interface.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Conteúdo do botão (texto ou elementos)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Função chamada quando o botão é clicado",
      table: {
        type: { summary: "() => void" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o botão e aplica estilos visuais",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básico
export const Default: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Botão no estado padrão, pronto para interação.",
      },
    },
  },
};

// Botão primário
export const Primary: Story = {
  args: {
    children: "Primary Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Botão com estilo primário, ideal para ações principais.",
      },
    },
  },
};

// Botão desabilitado
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Botão no estado desabilitado - não é clicável e tem aparência esmaecida.",
      },
    },
  },
};

// Botão com conteúdo longo
export const WithLongText: Story = {
  args: {
    children: "Button with very long text content that wraps",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Botão com texto longo para testar o comportamento de quebra de linha.",
      },
    },
  },
};

// Botão com conteúdo personalizado
export const WithCustomContent: Story = {
  args: {
    children: (
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add Item</span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Botão com conteúdo personalizado incluindo ícone e texto.",
      },
    },
  },
};

// Variações de tamanho através de classes
export const SizeVariations: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-center">
        <h4 className="text-white mb-2">Pequeno</h4>
        <Button {...args}>Small Button</Button>
      </div>
      <div className="text-center">
        <h4 className="text-white mb-2">Médio (Padrão)</h4>
        <Button {...args}>Medium Button</Button>
      </div>
      <div className="text-center">
        <h4 className="text-white mb-2">Grande</h4>
        <Button {...args}>Large Button</Button>
      </div>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Variações de tamanho do botão usando classes CSS personalizadas.",
      },
    },
  },
};

// Estados interativos
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-center">
        <h4 className="text-white mb-2">Normal</h4>
        <Button {...args}>Normal State</Button>
      </div>
      <div className="text-center">
        <h4 className="text-white mb-2">Hover</h4>
        <p className="text-gray-400 text-sm mb-2">
          Passe o mouse sobre o botão
        </p>
        <Button {...args}>Hover State</Button>
      </div>
      <div className="text-center">
        <h4 className="text-white mb-2">Focus</h4>
        <p className="text-gray-400 text-sm mb-2">
          Clique ou use Tab para focar
        </p>
        <Button {...args}>Focus State</Button>
      </div>
      <div className="text-center">
        <h4 className="text-white mb-2">Disabled</h4>
        <Button {...args} disabled>
          Disabled State
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstração dos diferentes estados visuais do botão.",
      },
    },
  },
};

// Botões em contexto de uso
export const InContext: Story = {
  render: (args) => (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4 min-w-80">
      <h3 className="text-white text-lg font-semibold">User Profile</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Email verified</span>
          <Button {...args}>Verify</Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Two-factor auth</span>
          <Button {...args}>Enable</Button>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-700">
        <Button {...args}>Save Changes</Button>
      </div>
    </div>
  ),
  args: {
    children: "Action Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Exemplo do botão sendo usado em um contexto real de aplicação.",
      },
    },
  },
};

// Grupo de botões
export const ButtonGroup: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-3">Horizontal Group</h4>
        <div className="flex gap-2 justify-center">
          <Button {...args}>Cancel</Button>
          <Button {...args}>Save</Button>
          <Button {...args}>Delete</Button>
        </div>
      </div>
      <div className="text-center">
        <h4 className="text-white mb-3">Vertical Group</h4>
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          <Button {...args}>Primary Action</Button>
          <Button {...args}>Secondary Action</Button>
          <Button {...args} disabled>
            Disabled Action
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Exemplos de botões usados em grupos para múltiplas ações.",
      },
    },
  },
};
