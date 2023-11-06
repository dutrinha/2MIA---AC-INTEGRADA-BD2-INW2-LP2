//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/passocerto',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model do seu projeto
const usuario = new mongoose.Schema({
    email : {type : String, required: true},
    senha : {type : String}
});

const Pessoa = mongoose.model("Pessoa", usuario);

//configurando os roteamentos
app.post("/cadastropessoa", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

    const pessoa = new Pessoa({
        email : email,
        senha : senha,
    })


    try{
        const newPessoa = await pessoa.save();
        res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id});
    } catch(error){
        res.status(400).json({error});
    }


});


//criando a model do seu projeto
const produtocalcado = new mongoose.Schema({
    id_produtocalcado : {type : String, required: true},
    descricao : {type : String},
    marca : {type: String},
    Data_fabricacao : {type : String},
    Quantidade_estoque : {type : String}
});

const Calcado = mongoose.model("Calcado", produtocalcado);

//configurando os roteamentos
app.post("/cadastroproduto", async(req, res)=>{
    const id_produtocalcado = req.body.id_produtocalcado;
    const descricao = req.body.descricao;
    const marca  = req.body.marca;
    const Data_fabricacao = req.body.Data_fabricacao;
    const Quantidade_estoque = req.body.Quantidade_estoque

    const calcado = new Calcado({
        id_produtocalcado : id_produtocalcado,
        descricao : descricao,
        marca : marca,
        Data_fabricacao : Data_fabricacao,
        Quantidade_estoque : Quantidade_estoque
    })

    try{
        const newCalcado = await calcado.save();
        res.json({error : null, msg : "Cadastro ok", calcadoId : newCalcado._id});
    } catch(error){
        res.status(400).json({error});
    }


});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})


//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
