import React, { useState } from 'react';
import './Dialog.css';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfessorData) => void;
}

interface ProfessorData {
  nome: string;
  departamento: string;
  cargaHoraria: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProfessorData>({
    nome: '',
    departamento: '',
    cargaHoraria: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.nome && formData.departamento && formData.cargaHoraria) {
      onSubmit(formData);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      departamento: '',
      cargaHoraria: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Cadastrar professor</h2>
          <p>Preencha os campos abaixo</p>
        </div>
        
        <div className="dialog-form">
          <div className="form-group">
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome do professor"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="departamento"
              value={formData.departamento}
              onChange={handleInputChange}
              placeholder="Digite o departamento do professor"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="cargaHoraria"
              value={formData.cargaHoraria}
              onChange={handleInputChange}
              placeholder="Digite a carga horária do professor"
              className="form-input"
            />
          </div>

          <div className="dialog-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-submit"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exemplo de uso do componente
const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitProfessor = (data: ProfessorData) => {
    console.log('Professor cadastrado:', data);
    // Aqui você pode adicionar a lógica para salvar os dados
  };

  return (
    <div className="app">
      <button 
        onClick={handleOpenDialog}
        className="btn btn-primary"
      >
        Cadastrar Professor
      </button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitProfessor}
      />
    </div>
  );
};

export default App;