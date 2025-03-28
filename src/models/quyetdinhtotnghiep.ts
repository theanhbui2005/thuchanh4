import { useState } from 'react';
const useDecisionModel = () => {
    // State chứa danh sách quyết định
    const [decisions, setDecisions] = useState<Decision.Record[]>(() => {
      return JSON.parse(localStorage.getItem('decisions') || '[]');
    });
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedDecision, setSelectedDecision] = useState<Decision.Record | null>(null);
  
    // Hàm thêm quyết định mới, lưu ý: đối tượng decision cần có trường sovanbangId
    const addDecision = (decision: Omit<Decision.Record, 'id'>) => {
      const maxId = decisions.reduce((max, dec) => Math.max(max, dec.id), 0);
      const newDecision = { ...decision, id: maxId + 1 };
      const newDecisions = [...decisions, newDecision];
      localStorage.setItem('decisions', JSON.stringify(newDecisions));
      setDecisions(newDecisions);
    };
  
    // Hàm cập nhật quyết định đã có
    const updateDecision = (updatedDecision: Decision.Record) => {
      const newDecisions = decisions.map(dec =>
        dec.id === updatedDecision.id ? updatedDecision : dec
      );
      localStorage.setItem('decisions', JSON.stringify(newDecisions));
      setDecisions(newDecisions);
    };
  
    // Hàm xóa quyết định theo id
    const deleteDecision = (decisionId: number) => {
      const newDecisions = decisions.filter(dec => dec.id !== decisionId);
      localStorage.setItem('decisions', JSON.stringify(newDecisions));
      setDecisions(newDecisions);
    };
  
    return {
      decisions,
      visible,
      setVisible,
      isEdit,
      setIsEdit,
      selectedDecision,
      setSelectedDecision,
      addDecision,
      updateDecision,
      deleteDecision,
    };
  };
  
  export default useDecisionModel;