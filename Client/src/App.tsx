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
      authorization: `eyJraWQiOiIzZ1U3bzFFVkg2bTJKY3AxXC9TVWpMYTlIQUJFelluQUx6QXNPS0lLNDE4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0YzliODNhNy1hZmEzLTQ3NTEtYjYzNi0yNjE3MWNhOGU5ZDEiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbl82OTI2MjdlZi1mZGE4LTQyMDMtYjEwOC1lOGU5ZjUyYWQ0MTAiLCJ0ZW5hbnRfNjkyNjI3ZWYtZmRhOC00MjAzLWIxMDgtZThlOWY1MmFkNDEwIiwidGVuYW50Xzk0MGU4ZWRmLWVkZDktNDAxZC1hMjFhLTEwZjg2NmZiZGIzZiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VYXFsdUxPaHEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxcDNoNG1rc2ZhdWU0cThqbjQ3dWZlYm9yIiwib3JpZ2luX2p0aSI6IjIyNDZmOTNlLTNlOGEtNGZhYS1iNWZjLThkM2FkOWY2N2QwMSIsImV2ZW50X2lkIjoiMjMwZTdiYWUtODZlMS00NmM3LThkOGUtNDY3Y2FhNDY4MTc3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJwaG9uZSBncmF2aXR5XC9ncmFwaHFsIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY4NzA4MDgzNSwiZXhwIjoxNjg4OTg4MDExLCJpYXQiOjE2ODg5MDE2MTEsImp0aSI6IjhjMDA3MWQzLWJlM2MtNDliOS05NjZjLTdmYTEyZjE1MzI0YSIsInVzZXJuYW1lIjoiY29kZXRlc3QtdXNlciJ9.mYzfsWzdKrZ55fsIcqHP8SdxqGMcb7jmgPxPMnCb8m4PRrmDUnLWvz0DE5jUyrQs7PBeQL_wDlrUn44OlJTnTJy6EGYVN8hZdJKbY3EHB8P38bddLuoN5aJF3NgECTWO9-kYdrYquZU0O-B1jgyQvBxV-q0CeVQmm1dmKQi4-JJo3MKRp0aX3p4iJoxVfeHi6oA3d1tCfwSrFWI_TG7WD2NQJNAeQ58YleupNZtCrHXr_UT4ioH_frNDyzu_3qRs7wmwQ5WhrD_stPmB8N0tTuaow-v-G2XZH7EtqbRYR54LN95fkd4rrzu7wXIcFCl5TSZV1x5wnofC_Xsm9Dbk3g`
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

export const tenant = '940e8edf-edd9-401d-a21a-10f866fbdb3f'
const App: React.FC = () => {
  return (
    <ApolloProviderWrapper>
      <Routing />
    </ApolloProviderWrapper>
  )
}

export default App
