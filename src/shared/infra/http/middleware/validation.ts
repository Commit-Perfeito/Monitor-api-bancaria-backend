import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query"; //Possibilidades de validação pro middleware

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>; // "<T>" é para deixar a tipagem da função generica || Retorna um unico schema de todos que vem

type TallSchemas = Record<TProperty, Schema<unknown>>; // Todos os schemas do TProperty || aqui tem erro(POR ENQUANTO!!!!)

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TallSchemas>; //Retornar todos os schemas de uma vez

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler; //Partial deixa não Obrigatório igual ? no Typescript

/*
função abaixo percorre cada schema e retorna cada erro de cada schema,
mesmo que o primeiro erro seja no primeiro schema, fazendo assim estorar
todos os erros possiveis
*/
export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {}; // Função de Error para o usuario

    Object.entries(schemas).forEach(([key, schema]) => {
      // percorre cada schema (ex: TProperty) para fazer a validação
      try {
        schema.validateSync(req[key as TProperty], {
          // "as" = como, deixando com modelo
          abortEarly: false, //validar tudo antes de retornar erro
        });
        // return next();
      } catch (err) {
        const YupError = err as ValidationError;
        const errors: Record<string, string> = {}; //Mapear Todos os erros

        YupError.inner.forEach((error) => {
          if (!error.path) return; //retornar caso esteja vazio
          errors[error.path] = error.message; //passar message junto do path
        });
        errorsResult[key] = errors; //
      }
    });
    if (Object.entries(errorsResult).length === 0) {
      // condição caso não estore nenhum erro
      return next(); // passa para criação
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST) // returna o erro como 404
        .json({ errors: errorsResult }); // Passa o erro que estorou
    }
  };
