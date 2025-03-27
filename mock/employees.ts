// mock/employees.ts
export default {
    "GET /api/employees": (req: any, res: any) => {
      res.json([
        { id: "emp1", name: "Nguyen Van A" },
        { id: "emp2", name: "Tran Thi B" },
      ]);
    },
  };