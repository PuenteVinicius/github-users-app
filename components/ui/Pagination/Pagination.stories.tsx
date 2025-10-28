// components/ui/Pagination/Pagination.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Um componente de paginação simples que permite navegar entre páginas. Oculta-se automaticamente quando há apenas uma página.",
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Página atual",
      table: {
        type: { summary: "number" },
      },
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Número total de páginas",
      table: {
        type: { summary: "number" },
      },
    },
    onPageChange: {
      action: "pageChanged",
      description: "Função chamada quando a página é alterada",
      table: {
        type: { summary: "(page: number) => void" },
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Template interativo com estado
const InteractivePagination = (args: any) => {
  const [page, setPage] = useState(args.currentPage || 1);

  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={(newPage) => {
        setPage(newPage);
        args.onPageChange(newPage);
      }}
    />
  );
};

// Paginação básica
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pagination no estado inicial, com botão "Previous" desabilitado.',
      },
    },
  },
};

// Paginação no meio
export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination no meio da sequência, ambos os botões habilitados.",
      },
    },
  },
};

// Última página
export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination na última página, com botão "Next" desabilitado.',
      },
    },
  },
};

// Paginação interativa
export const Interactive: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination interativa - clique nos botões para navegar entre páginas.",
      },
    },
  },
};

// Muitas páginas
export const ManyPages: Story = {
  args: {
    currentPage: 7,
    totalPages: 15,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination com muitas páginas, mostrando a contagem completa.",
      },
    },
  },
};

// Apenas uma página (deve ocultar)
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
  parameters: {
    docs: {
      description: {
        story: "Quando há apenas uma página, o componente não é renderizado.",
      },
    },
  },
};

// Duas páginas
export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination com apenas duas páginas - caso mínimo onde é exibido.",
      },
    },
  },
};

// Paginação em contexto de tabela
export const InTableContext: Story = {
  render: (args) => (
    <div className="bg-gray-800 rounded-lg p-6 min-w-96">
      <h3 className="text-white text-lg font-semibold mb-4">User List</h3>

      <div className="space-y-2 mb-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center p-3 bg-gray-700 rounded"
          >
            <span className="text-white">User {item}</span>
            <span className="text-gray-400 text-sm">Active</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <Pagination {...args} />
      </div>

      <div className="mt-2 text-center">
        <span className="text-gray-400 text-sm">
          Showing users {(args.currentPage - 1) * 5 + 1}-{args.currentPage * 5}
        </span>
      </div>
    </div>
  ),
  args: {
    currentPage: 1,
    totalPages: 4,
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination sendo usado em um contexto real de lista/tabela.",
      },
    },
  },
};

// Paginação em contexto de cards
export const InCardContext: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-6 rounded-xl min-w-80">
      <div className="text-center mb-6">
        <h3 className="text-white text-xl font-bold">Search Results</h3>
        <p className="text-gray-400">GitHub Users</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-800 p-3 rounded text-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-2"></div>
            <span className="text-white text-sm">user{item}</span>
          </div>
        ))}
      </div>

      <Pagination {...args} />

      <div className="mt-3 text-center">
        <span className="text-gray-500 text-xs">
          Page {args.currentPage} of {args.totalPages} • 20 results per page
        </span>
      </div>
    </div>
  ),
  args: {
    currentPage: 2,
    totalPages: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pagination em um contexto de grid de cards, como resultados de busca.",
      },
    },
  },
};
