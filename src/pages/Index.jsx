import { useState } from "react";
import { Box, Button, Container, Heading, Input, List, ListItem, Stack, Text, VStack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = () => {
    // Dummy data for demonstration purposes
    const dummyRecipes = [
      { name: "Tomato Pasta", ingredients: ["Tomato", "Pasta", "Olive Oil"], description: "A simple yet delicious pasta dish using fresh tomatoes and olive oil." },
      { name: "Chicken Salad", ingredients: ["Chicken", "Lettuce", "Tomato", "Cucumber"], description: "A refreshing salad with grilled chicken and fresh vegetables." },
      { name: "Omelette", ingredients: ["Egg", "Milk", "Cheese"], description: "A fluffy omelette made with eggs, milk, and your choice of cheese." },
      { name: "Beef Stew", ingredients: ["Beef", "Potato", "Carrot", "Onion"], description: "A hearty stew perfect for cold days, featuring tender beef and root vegetables." },
      { name: "Vegetable Curry", ingredients: ["Potato", "Carrot", "Peas", "Coconut Milk"], description: "A rich and creamy curry made with vegetables and coconut milk." },
      { name: "Fish Tacos", ingredients: ["Fish", "Tortillas", "Lime", "Cabbage"], description: "Crispy fish tacos with a tangy lime cabbage slaw." },
    ];

    // Filter recipes based on input ingredients
    const inputIngredients = ingredients
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim());
    const filteredRecipes = dummyRecipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map((ingredient) => {
          const isPresent = inputIngredients.includes(ingredient.toLowerCase());
          return { ingredient, isPresent };
        });
        const presentCount = recipeIngredients.filter((item) => item.isPresent).length;
        const totalIngredients = recipe.ingredients.length;
        const isMostlyPresent = presentCount / totalIngredients >= 0.8;
        return { ...recipe, recipeIngredients, isMostlyPresent };
      })
      .filter((recipe) => recipe.isMostlyPresent);

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
              {recipes.map((recipe, index) => {
                return (
                  <ListItem key={index} p={4} borderWidth="1px" borderRadius="lg">
                    <Heading as="h3" size="md">
                      {recipe.name}
                    </Heading>
                    <Text mb={2}>
                      Ingredients:{" "}
                      {recipe.recipeIngredients.map((item) => (
                        <span key={item.ingredient}>
                          {item.isPresent ? <span>✅ {item.ingredient}</span> : <span>❌ {item.ingredient}</span>}
                          {", "}
                        </span>
                      ))}
                    </Text>
                    <Text fontStyle="italic">{recipe.description}</Text>
                  </ListItem>
                );
              })}
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
