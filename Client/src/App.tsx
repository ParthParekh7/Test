import { Routing } from './routing/Routing'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://graph.dev.jit.care/graphql' // Replace with your GraphQL server URL
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `eyJraWQiOiIzZ1U3bzFFVkg2bTJKY3AxXC9TVWpMYTlIQUJFelluQUx6QXNPS0lLNDE4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0YzliODNhNy1hZmEzLTQ3NTEtYjYzNi0yNjE3MWNhOGU5ZDEiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbl82OTI2MjdlZi1mZGE4LTQyMDMtYjEwOC1lOGU5ZjUyYWQ0MTAiLCJ0ZW5hbnRfNjkyNjI3ZWYtZmRhOC00MjAzLWIxMDgtZThlOWY1MmFkNDEwIiwidGVuYW50Xzk0MGU4ZWRmLWVkZDktNDAxZC1hMjFhLTEwZjg2NmZiZGIzZiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VYXFsdUxPaHEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxcDNoNG1rc2ZhdWU0cThqbjQ3dWZlYm9yIiwib3JpZ2luX2p0aSI6IjIyNDZmOTNlLTNlOGEtNGZhYS1iNWZjLThkM2FkOWY2N2QwMSIsImV2ZW50X2lkIjoiMjMwZTdiYWUtODZlMS00NmM3LThkOGUtNDY3Y2FhNDY4MTc3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJwaG9uZSBncmF2aXR5XC9ncmFwaHFsIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4NzA4MDgzNSwiZXhwIjoxNjg4ODkxMzY2LCJpYXQiOjE2ODg4MDQ5NjYsImp0aSI6Ijg5ZDA2ZWJiLWNhNTEtNDczMi04Yzc1LWJhMjZkOGEwZjQ5MiIsInVzZXJuYW1lIjoiY29kZXRlc3QtdXNlciJ9.Ih_5uVVCyqYoVvX2HHlZBkpV8oPprv-lXuUr0k1WKnH75j4BTF7eTy1vYRryYsQMFaMEd8aZYotZfcyuciqk0epLAofY8XtUig02A6T9UEaYjDySuKZUQJNTGdpjyvO0IrJUeRy361zPanyw8zexnFPWbZJR0pM2HHMPcXXSfTWoBfziXJERJB7f5G6ZYsYjhPtU7Srh5_x5tJsz9NebBw4cU1qw9gsGYeANVK77JgAIFkHddydwiuAcouQGSmTB9Ujl9wUlGrjgVpIidI9wS50VztoYVEcDfagCeJMIpRbdLVIjjxXim2cHzRWnvqIaxwHXzrNWl29NeNjkiiROQw`
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

interface ApolloProviderWrapperProps {
  children: React.ReactNode
}

const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({
  children
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
const App: React.FC = () => {
  return (
    <ApolloProviderWrapper>
      <Routing />
    </ApolloProviderWrapper>
  )
}

export default App
