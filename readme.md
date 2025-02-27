#OTP Authentication 

Esse projeto se trata de backend em nodeJS onde foi criado uma API que realiza autenticação de contas atravez de uma autenticação OTP. 

##técnologias usadas 
- **Node.js**
- **Typescript**
- **PostgresSQL**
###bibliotecas e frameworks 
- **prisma**
- **express**
- **jsonwebtoken**
- **mailtrap**
- **uuid**
- **cors**
- **zod**

##funcionalidades
Com ela é possivel criar um usuario, fazer login em um usuario

##Endponits 
- Get  /ping -> rota de teste
- Post /auth/signin -> rota de login  
- Post /auth/signup -> rota de cadastro usuario
- post /auth/useotp -> rota para gerar o token JWT
- get private -> rota para testar a validação do token JWT