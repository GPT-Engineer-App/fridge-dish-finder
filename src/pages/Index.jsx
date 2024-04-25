import { useState } from "react";
import { Box, Button, Container, Heading, Input, List, ListItem, Stack, Text, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = () => {
    // Dummy data for demonstration purposes
    const dummyRecipes = [
      { name: "Tomato Pasta", ingredients: ["Tomato", "Pasta", "Olive Oil"] },
      { name: "Chicken Salad", ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber"] },
      { name: "Omelette", ingredients: ["Egg", "Milk", "Cheese"] },
    ];

    // Filter recipes based on input ingredients
    const inputIngredients = ingredients
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim());
    const filteredRecipes = dummyRecipes.filter((recipe) => recipe.ingredients.every((ingredient) => inputIngredients.includes(ingredient.toLowerCase())));

    setRecipes(filteredRecipes);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl">
          Recipe Finder
        </Heading>
        <Text>Enter ingredients you have, separated by commas (e.g., tomato, pasta, olive oil)</Text>
        <Input placeholder="Enter ingredients..." value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={handleSearch}>
          Find Recipes
        </Button>
        <Box w="full">
          {recipes.length > 0 ? (
            <List spacing={3}>
              {recipes.map((recipe, index) => (
                <ListItem key={index} p={4} borderWidth="1px" borderRadius="lg">
                  <Heading as="h3" size="md">
                    {recipe.name}
                  </Heading>
                  <Text>Ingredients: {recipe.ingredients.join(", ")}</Text>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No recipes found. Please try different ingredients.</Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
