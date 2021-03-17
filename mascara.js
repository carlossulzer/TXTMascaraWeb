function EE_KeyPress($a)
{
  var k=EE_GetKeyCode();
  var c=EE_GetKeyString(k);
  var x=EE_getSelectionStart($a);
  event.returnValue=false;
  if(k>=48&&k<=57)
     EE_KeyNumber($a,x,c);
}

function EE_KeyDown($a)
{
  var k=EE_GetKeyCode();
  var x=EE_getSelectionStart($a);
  if(k==8||k==37||k==39||k==46)
  {
    event.returnValue=false;
    if(k==8)
      EE_KeyBackspace($a,x);
    else if(k==37)
      EE_PushCaretPos($a,0);
    else if(k==39)
      EE_PushCaretPos($a,1);
    else if(k==46)
      EE_KeyDelete($a,x);}
 }

function EE_KeyNumber($a,$b,c)
{
  EE_CutMask($a,$b,1);
  EE_InsertChar($a,c,$b);
  EE_PutCaretPos($a,$b);
  EE_PushCaretPos($a,1);
}

function EE_KeyDelete($a,$b)
{
  EE_CutMask($a,$b,1);
  EE_InsertChar($a,"_",$b);
  EE_PutCaretPos($a,$b);
}

function EE_KeyBackspace($a,$b)
{
  var $z=false;
  var oP=$b;
  while($z==false&&$b>0)
  {
    var x=EE_CharAtCaretPos($a,$b-1);
    if(EE_IsData($a,$b-1))
    {
      EE_CutMask($a,$b,0);
      EE_InsertChar($a,"_",$b-1);
      $z=true;
      EE_PutCaretPos($a,$b-1);
    }
    else if(x=="_")
    {
      $z=true;
      EE_PutCaretPos($a,$b-1);
    };
    $b--;
  };

  if(!$z)EE_PutCaretPos($a,oP);
}


function EE_PushCaretPos($a,$d)
{
  var k=EE_getSelectionStart($a);
  var x=EE_CharAtCaretPos($a,k);
  do
  {
     if($d==0)
     {
       if(k>0)EE_PutCaretPos($a,--k);
     }
     else
     {
       if(k<$a.value.length-1)
         EE_PutCaretPos($a,++k);
     };
     x=EE_CharAtCaretPos($a,k)
  };
  while(x!="_"&&k<$a.value.length-1&&k!=0&&!EE_IsData($a,k))
    EE_SetupCaretPos($a);
}

function EE_InsertChar($a,c,$b)
{
  var x=$a.value;
  var $e=x.substring(0,$b);
  var $f=x.substring($b,x.length);
  $a.value=$e+c+$f;
}

function EE_CutMask($a,k,$d)
{
  var x=$a.value;
  if($d==0)
  {
    var $e=x.substring(0,k-1);
    var $f=x.substring(k,x.length);
  }
  else
  {
    var $e=x.substring(0,k);
    var $f=x.substring(k+1,x.length);
  };
  $a.value=$e+$f;
}

function EE_OnClick($a)
{
  var x=EE_getSelectionStart($a);
  EE_PutCaretPos($a,x);
  EE_SetupCaretPos($a);
}

function EE_GetKeyCode()
{
  var $g=(document.layers)?$h.which:event.keyCode;
  return $g;
}

function EE_GetKeyString($g)
{
  var x=String.fromCharCode($g);
  return x;
}

function EE_CharAtCaretPos($a,$b)
{
  var x=$a.value.split("");
  if($b>=0&&$b<x.length)
    return x[$b];
  else
  {
    return "";
  }
}

function EE_SetupCaretPos($a)
{
  var x=EE_getSelectionStart($a);
  var $i=false;var oP=x;
  while(x<$a.value.length-1&&$i==false)
  {
    var y=EE_CharAtCaretPos($a,x);
    if(EE_IsData($a,x)||y=="_")
    {
        EE_PutCaretPos($a,x);
        $i=true;
    };
    x++;
  };

  if(!$i)
  {
    while(x>=0&&$i==false)
    {
      var y=EE_CharAtCaretPos($a,x);
      if(EE_IsData($a,x)||y=="_")
      {
        EE_PutCaretPos($a,x);
        $i=true;
      };
      x--;
    }
  };

  if(!$i)
  {
    if($a.type=="text")
    {
      $a.style.color="rgb(255,0,0)";
      $a.value="< mascara inv�lida >";
    }
  }
}

function EE_PutCaretPos($a,$b)
{
  if($b<=0)$b=0;
  if($b>=$a.value.length-1)
    $j=$a.value.length-1;
    if($a.createTextRange)
    {
      var r=$a.createTextRange();
      r.moveStart('character',$b);
      r.moveEnd('character',$b+1-$a.value.length);
      r.select();
    }
}

function EE_getSelectionStart($a)
{
  if($a.createTextRange)
  {
    $k=document.selection.createRange().duplicate();
    $k.moveEnd("character",$a.value.length);
    $b=$a.value.lastIndexOf($k.text);
    if($k.text=="")
      $b=$a.value.length;
    return $b;
  }
  else
  {
    return $a.selectionStart;
  }
}

function EE_getSelectionEnd($a)
{
  if($a.createTextRange)
  {
    $k=document.selection.createRange().duplicate();
    $k.moveStart("character",-$a.value.length);
    $b=$k.text.length;
    return $b;
  }
  else
  {
    return $a.selectionEnd;
  }
}

function EE_GotFocus($a)
{
  EE_DisplayMask($a);
  EE_PutCaretPos($a,0);
  EE_SetupCaretPos($a);
}

function EE_DisplayMask($a)
{
  if($a.value=="")
    $a.value=$a.mask;
}

function EE_LostFocus($a)
{
  if($a.value==$a.mask)
    $a.value="";
}

function EE_IsData($a,$b)
{
  if($b>=0)
  {
    var x=$a.value.charCodeAt($b);
    if(x>=48&&x<=57)
      return true;
    else
    {
      return false;
    }
  }
  else
  {
    return false;
  }
};

/**************************************************************************************
 *
 * PROT�TIPOS:
 * m�todo String.lpad(int pSize, char pCharPad)
 * m�todo String.trim()
 *
 * String unformatNumber(String pNum)
 * String formatCpfCnpj(String pCpfCnpj, boolean pUseSepar, boolean pIsCnpj)
 * String dvCpfCnpj(String pEfetivo, boolean pIsCnpj)
 * boolean isCpf(String pCpf)
 * boolean isCnpj(String pCnpj)
 * boolean isCpfCnpj(String pCpfCnpj)
 **************************************************************************************/
NUM_DIGITOS_CPF  = 11;
NUM_DIGITOS_CNPJ = 14;
NUM_DGT_CNPJ_BASE = 8;

/*
 * Adiciona m�todo lpad() � classe String.
 * Preenche a String � esquerda com o caractere fornecido,
 * at� que ela atinja o tamanho especificado.
 */
String.prototype.lpad = function(pSize, pCharPad)
{
	var str = this;
	var dif = pSize - str.length;
	var ch = String(pCharPad).charAt(0);
	for (; dif>0; dif--) str = ch + str;
	return (str);
} //String.lpad

/**
 * Adiciona m�todo trim() � classe String.
 * Elimina brancos no in�cio e fim da String.
 */
String.prototype.trim = function()
{
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
} //String.trim


/**
 * Elimina caracteres de formata��o e zeros � esquerda da string
 * de n�mero fornecida.
 * @param String pNum
 * 	String de n�mero fornecida para ser desformatada.
 * @return String de n�mero desformatada.
 */
function unformatNumber(pNum)
{
	return String(pNum).replace(/\D/g, "").replace(/^0+/, "");
} //unformatNumber

/**
 * Formata a string fornecida como CNPJ ou CPF, adicionando zeros
 * � esquerda se necess�rio e caracteres separadores, conforme solicitado.
 * @param String pCpfCnpj
 * 	String fornecida para ser formatada.
 * @param boolean pUseSepar
 * 	Indica se devem ser usados caracteres separadores (. - /).
 * @param boolean pIsCnpj
 * 	Indica se a string fornecida � um CNPJ.
 * 	Caso contr�rio, � CPF. Default = false (CPF).
 * @return String de CPF ou CNPJ devidamente formatada.
 */
function formatCpfCnpj(pCpfCnpj, pUseSepar, pIsCnpj)
{
	if (pIsCnpj==null) pIsCnpj = false;
	if (pUseSepar==null) pUseSepar = true;
	var maxDigitos = pIsCnpj? NUM_DIGITOS_CNPJ: NUM_DIGITOS_CPF;
	var numero = unformatNumber(pCpfCnpj);

	numero = numero.lpad(maxDigitos, '0');
	if (!pUseSepar) return numero;

	if (pIsCnpj)
	{
		reCnpj = /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
		numero = numero.replace(reCnpj, "$1.$2.$3/$4-$5");
	}
	else
	{
		reCpf  = /(\d{3})(\d{3})(\d{3})(\d{2})$/;
		numero = numero.replace(reCpf, "$1.$2.$3-$4");
	}
	return numero;
} //formatCpfCnpj


/**
 * Calcula os 2 d�gitos verificadores para o n�mero-efetivo pEfetivo de
 * CNPJ (12 d�gitos) ou CPF (9 d�gitos) fornecido. pIsCnpj � booleano e
 * informa se o n�mero-efetivo fornecido � CNPJ (default = false).
 * @param String pEfetivo
 * 	String do n�mero-efetivo (SEM d�gitos verificadores) de CNPJ ou CPF.
 * @param boolean pIsCnpj
 * 	Indica se a string fornecida � de um CNPJ.
 * 	Caso contr�rio, � CPF. Default = false (CPF).
 * @return String com os dois d�gitos verificadores.
 */
function dvCpfCnpj(pEfetivo, pIsCnpj)
{
	if (pIsCnpj==null) pIsCnpj = false;
	var i, j, k, soma, dv;
	var cicloPeso = pIsCnpj? NUM_DGT_CNPJ_BASE: NUM_DIGITOS_CPF;
	var maxDigitos = pIsCnpj? NUM_DIGITOS_CNPJ: NUM_DIGITOS_CPF;
	var calculado = formatCpfCnpj(pEfetivo, false, pIsCnpj);
	calculado = calculado.substring(2, maxDigitos);
	var result = "";

	for (j = 1; j <= 2; j++)
	{
		k = 2;
		soma = 0;
		for (i = calculado.length-1; i >= 0; i--)
		{
			soma += (calculado.charAt(i) - '0') * k;
			k = (k-1) % cicloPeso + 2;
		}
		dv = 11 - soma % 11;
		if (dv > 9) dv = 0;
		calculado += dv;
		result += dv
	}

	return result;
} //dvCpfCnpj


/**
 * Testa se a String pCpf fornecida � um CPF v�lido.
 * Qualquer formata��o que n�o seja algarismos � desconsiderada.
 * @param String pCpf
 * 	String fornecida para ser testada.
 * @return <code>true</code> se a String fornecida for um CPF v�lido.
 */
function isCpf(pCpf)
{
	var numero = formatCpfCnpj(pCpf.value, false, false);
	if (numero == "00000000000") 
	{
	    EE_LostFocus(pCpf)
	    return true;
	}
	var base = numero.substring(0, numero.length - 2);
	var digitos = dvCpfCnpj(base, false);
	var algUnico, i;

	// Valida d�gitos verificadores
	if (numero != base + digitos) return false;

	/* N�o ser�o considerados v�lidos os seguintes CPF:
	 * 000.000.000-00, 111.111.111-11, 222.222.222-22, 333.333.333-33, 444.444.444-44,
	 * 555.555.555-55, 666.666.666-66, 777.777.777-77, 888.888.888-88, 999.999.999-99.
	 */
	algUnico = true;
	for (i=1; i<NUM_DIGITOS_CPF; i++)
	{
		algUnico = algUnico && (numero.charAt(i-1) == numero.charAt(i));
	}
	return (!algUnico);
} //isCpf


/**
 * Testa se a String pCnpj fornecida � um CNPJ v�lido.
 * Qualquer formata��o que n�o seja algarismos � desconsiderada.
 * @param String pCnpj
 * 	String fornecida para ser testada.
 * @return <code>true</code> se a String fornecida for um CNPJ v�lido.
 */
function isCnpj(pCnpj)
{
	var numero = formatCpfCnpj(pCnpj.value, false, true);
	var base = numero.substring(0, NUM_DGT_CNPJ_BASE);
	var ordem = numero.substring(NUM_DGT_CNPJ_BASE, 12);
	var digitos = dvCpfCnpj(base + ordem, true);
	var algUnico;

	// Valida d�gitos verificadores
	if (numero != base + ordem + digitos) 
	{
		return false;
	}

	/* N�o ser�o considerados v�lidos os CNPJ com os seguintes n�meros B�SICOS:
	 * 11.111.111, 22.222.222, 33.333.333, 44.444.444, 55.555.555,
	 * 66.666.666, 77.777.777, 88.888.888, 99.999.999.
	 */
	algUnico = numero.charAt(0) != '0';
	for (i=1; i<NUM_DGT_CNPJ_BASE; i++)
	{
		algUnico = algUnico && (numero.charAt(i-1) == numero.charAt(i));
	}
	if (algUnico) 
	{
		return false;
	}
	/* N�o ser� considerado v�lido CNPJ com n�mero de ORDEM igual a 0000.
	 * N�o ser� considerado v�lido CNPJ com n�mero de ORDEM maior do que 0300
	 * e com as tr�s primeiras posi��es do n�mero B�SICO com 000 (zeros).
	 * Esta cr�tica n�o ser� feita quando o no B�SICO do CNPJ for igual a 00.000.000.
	 */
	//if (ordem == "0000") // cnpj obrigatorio
	if ((base + ordem + digitos)== '00000000000000' )
	{
		EE_LostFocus(pCnpj)
		return true;
	}
	return (base == "00000000" || parseInt(ordem, 10) <= 300 || base.substring(0, 3) != "000");
} //isCnpj


/**
 * Testa se a String pCpfCnpj fornecida � um CPF ou CNPJ v�lido.
 * Se a String tiver uma quantidade de d�gitos igual ou inferior
 * a 11, valida como CPF. Se for maior que 11, valida como CNPJ.
 * Qualquer formata��o que n�o seja algarismos � desconsiderada.
 * @param String pCpfCnpj
 * 	String fornecida para ser testada.
 * @return <code>true</code> se a String fornecida for um CPF ou CNPJ v�lido.
 */
function isCpfCnpj(pCpfCnpj)
{
	var numero = pCpfCnpj.replace(/\D/g, "");
	if (numero.length > NUM_DIGITOS_CPF)
		return isCnpj(pCpfCnpj)
	else
		return isCpf(pCpfCnpj);
} //isCpfCnpj


function MsgErro (theField, txterro)
{   theField.focus()
    theField.select()
	alert(txterro)
    return false
}


//=============================================================================================
// Fun��es para formata��o de moeda
//=============================================================================================

 function DigitoMoeda() 
 {
   if ((event.keyCode < 48 || event.keyCode > 57) &&  event.keyCode != 44 )
     event.keyCode = 0;
 }   

function MascaraMoeda(obj)
{
    var valor = obj.value;
    if (valor.length > 0)
    {
        aux = valor.indexOf(","); 
 
        if (aux > 0)
        {
            if ((valor.length > aux) && (aux > 0))
            {
                var zeros = (valor.length - aux) - 1;
                if (zeros < 2)
                { 
                    valor = valor + "0"
                } 
            }       
        }
        else
        {
            valor = valor.replace(",","")+"00";
 
            if (valor.length >= 3)
            {
                valor = PontoMoeda(valor.substring(0,valor.length-2))+","+valor.substring(valor.length-2, valor.length);
            }
            else if (valor.length = 2)
            {
                valor = valor + ",00"
            }
        }
        obj.value = valor;
    }
    else
    {
        obj.value = "0,00"
    }
}

function PontoMoeda(valor)
{
    valor = valor.replace(/\./g,"");
    if (valor.length > 3)
    {
        valores = "";
        while (valor.length > 3)
        {
            valores = "."+valor.substring(valor.length-3,valor.length)+""+valores;
            valor = valor.substring(0,valor.length-3);
        }
        return valor+valores;
    }
    else
    {
        return valor;
    }
}

function SelecionaMoeda(campo)
{
    if(campo.value.length == 0)
        campo.value = "0,00";

    if(campo.value.length >0)
    {
        if(campo.createTextRange)
        {
            var r=campo.createTextRange();
            r.moveStart('character',0);
            r.moveEnd('character',campo.value.length-1);
            r.select();
        }
    }
}

//=============================================================================================
// Fun��es para aceitar digita��oo apenas de n�meros
//=============================================================================================


 function SomenteNumeros() 
 {
   if (event.keyCode < 48 || event.keyCode > 57) 
     event.keyCode = 0;
 }   

//=============================================================================================
// Fun��o para validae data
//=============================================================================================
function ValidarData(campo)
{

    if(campo.value=="__/__/____")
    {
        campo.value="";
        return true;
    }
    else
    {
        var expReg = /^(([0-2]\d|[3][0-1])\/([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
        //var msgErro = 'Data inv�lida.';
        if ((campo.value.match(expReg)) && (campo.value!=''))
        {
            var dia = parseInt(campo.value.substring(0,2));
            var mes = parseInt(campo.value.substring(3,5));
            var ano = parseInt(campo.value.substring(6,10));
            mesAno = ((mes < 10) ? "0" + mes + "/" + ano : mes + "/" + ano) 
            if((mes==4 || mes==6 || mes==9 || mes==11) && (dia > 30))
            {
                campo.value = "30/"+mesAno;
                return false;
            } 
            else
            {
                if(ano%4!=0 && mes==2 && dia>28)
                {
                    campo.value = "28/"+mesAno;
                    return false;
                } 
                else
                {
                    if(ano%4==0 && mes==2 && dia>29)
                    {
                        campo.value = "29/"+mesAno;
                        return false;
                    } 
                    else
                    { 
                        return true;
                    }
                }
            }
        } 
        else 
        {
            campo.value = "";
            campo.focus();
            return false;
        }
    }
}
