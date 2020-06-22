const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

module.exports = new GraphQLScalarType({
    name: "GraphQLDate",
    description: "JS Date type for GraphQL",
    //serialize data way out
    serialize(value) {
      return value.toISOString();
    },
  
    //parse data way in
    parseLiteral(ast) {
      //when date is passed directly as string (if not string then return undefined)
      //return (ast.kind === Kind.STRING) ? new Date(ast.value) : undefined
      //returning an undefined type indicating GraphQL that this type cannot be converted into Date --> will be treated as error
      if (ast.kind === Kind.STRING) {
        const date = new Date(ast.value);
        //return isNaN(date) ? undefined : date //isNan is a restricted global func
        return Number.isNaN(date.getDate()) ? undefined : date;
      }
      //return nothing will be treated the same as return undefined
    },
    parseValue(value) {
      //when date is passed as variable
      //return new Date(value) // do we need to return undefined if new Date(value) returns an Invalid Date?
      const date = new Date(value);
      //return isNaN(date) ? undefined : date //isNan is a restricted global func
      return Number.isNaN(date.getDate()) ? undefined : date;
    },
});
  