import { useState } from 'react';
import { toast } from 'react-toastify';
import { Shield, Plus, Trash2, UserPlus } from 'react-feather';
import { usePermissoes, useCreatePermissao, useDeletePermissao, useAtribuirPermissao, Permissao } from '../../hooks/usePermissoesAdmin';
import { Dialog } from '../../components/Dialog/Dialog';
import './index.css';

export function Permissoes() {
  const { data: permissoes, isLoading, error } = usePermissoes();
  const createPermissao = useCreatePermissao();
  const deletePermissao = useDeletePermissao();
  const atribuirPermissao = useAtribuirPermissao();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAtribuirOpen, setIsAtribuirOpen] = useState(false);
  const [novaDescricao, setNovaDescricao] = useState('');
  const [atribuirData, setAtribuirData] = useState({ usuarioId: '', permissaoId: '' });

  const handleCriar = async () => {
    if (!novaDescricao.trim()) {
      toast.error('A descrição da permissão é obrigatória');
      return;
    }
    try {
      await createPermissao.mutateAsync(novaDescricao);
      toast.success('Permissão criada com sucesso!');
      setNovaDescricao('');
      setIsCreateOpen(false);
    } catch {
      toast.error('Erro ao criar permissão');
    }
  };

  const handleDeletar = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja remover esta permissão?')) return;
    try {
      await deletePermissao.mutateAsync(id);
      toast.success('Permissão removida com sucesso!');
    } catch {
      toast.error('Erro ao remover permissão');
    }
  };

  const handleAtribuir = async () => {
    const uId = Number(atribuirData.usuarioId);
    const pId = Number(atribuirData.permissaoId);
    if (!uId || !pId) {
      toast.error('Preencha o ID do usuário e selecione a permissão');
      return;
    }
    try {
      await atribuirPermissao.mutateAsync({ usuarioId: uId, permissaoId: pId });
      toast.success('Permissão atribuída com sucesso!');
      setAtribuirData({ usuarioId: '', permissaoId: '' });
      setIsAtribuirOpen(false);
    } catch {
      toast.error('Erro ao atribuir permissão. Verifique se o usuário já possui esta permissão.');
    }
  };

  if (error) {
    return (
      <section className="container-dashboard">
        <div className="error-message">
          <p>Erro ao carregar permissões.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-dashboard">
      <div className="header-dashboard">
        <div className="title">
          <h2>Gestão de Permissões</h2>
          <span>Gerir permissões do sistema e atribuí-las a utilizadores</span>
        </div>

        <div className="permissoes-actions">
          <button onClick={() => setIsAtribuirOpen(true)} className="btn-atribuir">
            <UserPlus size={16} />
            Atribuir a Usuário
          </button>
          <button onClick={() => setIsCreateOpen(true)}>
            <Plus size={16} />
            Nova Permissão
          </button>
        </div>
      </div>

      <div className="permissoes-grid">
        {isLoading ? (
          <div className="loading-state">Carregando permissões...</div>
        ) : permissoes && permissoes.length > 0 ? (
          permissoes.map((perm: Permissao) => (
            <div key={perm.permissaoId} className="permissao-card">
              <div className="permissao-header">
                <div className="permissao-info">
                  <Shield size={20} />
                  <div>
                    <h3>{perm.descricao}</h3>
                    <span className="permissao-id">ID: {perm.permissaoId}</span>
                  </div>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletar(perm.permissaoId)}
                  title="Remover permissão"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {perm.usuarios && perm.usuarios.length > 0 && (
                <div className="permissao-usuarios">
                  <span className="usuarios-label">
                    {perm.usuarios.length} usuário(s) com esta permissão:
                  </span>
                  <ul>
                    {perm.usuarios.map((u, idx) => (
                      <li key={idx}>
                        <strong>{u.usuario.nome}</strong> — {u.usuario.email} ({u.usuario.tipo})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">Nenhuma permissão cadastrada no sistema.</div>
        )}
      </div>

      {/* Modal: Criar Permissão */}
      <Dialog.Root isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <Dialog.Header title="Nova Permissão" subtitle="Defina a descrição da nova permissão" />
        <Dialog.Content>
          <Dialog.Input
            required
            placeholder="Ex: Gerir Presenças"
            value={novaDescricao}
            onChange={(value) => setNovaDescricao(value)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Dialog.Button variant="secondary" onClick={() => setIsCreateOpen(false)}>
            Cancelar
          </Dialog.Button>
          <Dialog.Button onClick={handleCriar} disabled={createPermissao.isPending}>
            {createPermissao.isPending ? 'Criando...' : 'Criar'}
          </Dialog.Button>
        </Dialog.Actions>
      </Dialog.Root>

      {/* Modal: Atribuir Permissão */}
      <Dialog.Root isOpen={isAtribuirOpen} onClose={() => setIsAtribuirOpen(false)}>
        <Dialog.Header title="Atribuir Permissão" subtitle="Atribua uma permissão a um usuário existente" />
        <Dialog.Content>
          <Dialog.Input
            required
            type="number"
            placeholder="ID do Usuário"
            value={atribuirData.usuarioId}
            onChange={(value) => setAtribuirData(prev => ({ ...prev, usuarioId: value }))}
          />
          <Dialog.Select
            required
            options={[
              { label: 'Selecione a permissão', value: '' },
              ...(permissoes || []).map(p => ({ label: p.descricao, value: String(p.permissaoId) })),
            ]}
            value={atribuirData.permissaoId}
            onChange={(value) => setAtribuirData(prev => ({ ...prev, permissaoId: value }))}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Dialog.Button variant="secondary" onClick={() => setIsAtribuirOpen(false)}>
            Cancelar
          </Dialog.Button>
          <Dialog.Button onClick={handleAtribuir} disabled={atribuirPermissao.isPending}>
            {atribuirPermissao.isPending ? 'Atribuindo...' : 'Atribuir'}
          </Dialog.Button>
        </Dialog.Actions>
      </Dialog.Root>
    </section>
  );
}
