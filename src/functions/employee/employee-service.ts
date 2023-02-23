import { getDatabaseConnection } from "@libs/database-manager";
import { Employee } from "src/entities/employee.entity";

const create = async (employee: Employee): Promise<Employee> => {
  const employeeRepository = await (
    await getDatabaseConnection()
  ).getRepository(Employee);
  const newEmployee: Employee = await employeeRepository
    .save(employee)
    .catch((e) => {
      console.debug("failed to create employee Record", e);
      throw new Error(e);
    });
  return newEmployee;
};
export { create };
