import { Container, Theme } from "@radix-ui/themes";
import { Router } from "../router";

export const App = () => {
  return (
    <Theme>
      <Container size="2">
        <Router />
      </Container>
    </Theme>
  );
};
