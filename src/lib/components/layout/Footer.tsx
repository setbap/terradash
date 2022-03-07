import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { ReactNode } from 'react';


const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const baseColor = useColorModeValue('gray.700', 'whiteAlpha.700')
  return (
    <Box
      bg={useColorModeValue('white.50', 'gray.900')}
      color={baseColor}>
      <Container
        as={Stack}
        maxW={'100vw'}
        py={4}
        direction={'row'}
        spacing={4}
        justify={{ base: 'center', md: 'end' }}
        align={{ base: 'center', md: 'center' }}>

        <Text > ©SetBap & FlipSideCrypto</Text>
        <Stack direction={'row'} spacing={4}>
          <SocialButton label={'Github'} href={'http://github.com/setbap'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'WebSite'} href={'http://flipsidecrypto.xyz/'}>
            <CgWebsite />
          </SocialButton>
        </Stack>
      </Container>
    </Box >
  );
}