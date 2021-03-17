using System;
using System.ComponentModel;
using System.Web.UI;

namespace WebCtrlMascara
{
	/// <summary>
	/// Summary description for WebCustomControl1.
	/// </summary>

	[ToolboxData("<{0}:MascaraEntrada runat=server></{0}:MascaraEntrada>")]
	
	public class MascaraEntrada : System.Web.UI.WebControls.TextBox
	{
		private const string  idScript = "ScriptMascara";

		public enum tpMascara
		{
            NUMERO,
            DATA,
            VALOR, 
            CPF, 
			CNPJ,
			TELEFONE,
			CEP            
		}

		tpMascara vMascara;
		public tpMascara Mascara
		{
			get{return (vMascara);}
			set{vMascara = value;}
		}
		
		protected override void Render(System.Web.UI.HtmlTextWriter writer)
		{
            switch (vMascara)
            {
                case tpMascara.NUMERO:
                {
                    writer.AddAttribute("onkeypress", "SomenteNumeros();");
                    break;
                }

                case tpMascara.DATA:
                {
                    
                    writer.AddAttribute("MaxLength", "10");
                    writer.AddAttribute("mask", "__/__/____");
                    writer.AddAttribute("onkeydown", "EE_KeyDown(this)");
                    writer.AddAttribute("onkeypress", "EE_KeyPress(this)");
                    writer.AddAttribute("onclick", "EE_OnClick(this)");
                    writer.AddAttribute("onfocus", "EE_GotFocus(this)");
                    writer.AddAttribute("onblur", "if (! ValidarData(this)){MsgErro(this,'Data Inválida !')}");
                    break;
                }
                case tpMascara.VALOR:
                {
                    writer.AddAttribute("style", "text-align: right");
                    writer.AddAttribute("onkeypress", "DigitoMoeda();");
                    writer.AddAttribute("onblur", "MascaraMoeda(this);");
                    writer.AddAttribute("onfocus", "SelecionaMoeda(this);");
                    break;
                }
                case tpMascara.CPF:
			    {
				    writer.AddAttribute("MaxLength","14"); 
				    writer.AddAttribute("mask","___.___.___-__"); 
				    writer.AddAttribute("onkeydown","EE_KeyDown(this)"); 
				    writer.AddAttribute("onkeypress","EE_KeyPress(this)"); 
				    writer.AddAttribute("onclick","EE_OnClick(this)"); 
				    writer.AddAttribute("onfocus","EE_GotFocus(this)"); 
				    //writer.AddAttribute("onblur","EE_LostFocus(this)"); 
                    writer.AddAttribute("onblur", "if (! isCpf(this)){MsgErro(this,'Cpf Inválido !')}");
                    break;
			    }

                case tpMascara.CNPJ:
                {
                    writer.AddAttribute("MaxLength", "18");
                    writer.AddAttribute("mask", "__.___.___/____-__");
                    writer.AddAttribute("onkeydown", "EE_KeyDown(this)");
                    writer.AddAttribute("onkeypress", "EE_KeyPress(this)");
                    writer.AddAttribute("onclick", "EE_OnClick(this)");
                    writer.AddAttribute("onfocus", "EE_GotFocus(this)");
                    //writer.AddAttribute("onblur","EE_LostFocus(this)"); 
                    writer.AddAttribute("onblur", "if (! isCnpj(this)){MsgErro(this,'CNPJ Inválido !')}");
                    break;
                }

                case tpMascara.TELEFONE:
			    {
				    writer.AddAttribute("MaxLength","14"); 
			        writer.AddAttribute("mask","(__)____-____"); 
				    writer.AddAttribute("onkeydown","EE_KeyDown(this)"); 
				    writer.AddAttribute("onkeypress","EE_KeyPress(this)"); 
				    writer.AddAttribute("onclick","EE_OnClick(this)"); 
				    writer.AddAttribute("onfocus","EE_GotFocus(this)"); 
				    writer.AddAttribute("onblur","EE_LostFocus(this)"); 
                    break;
			    }
                case tpMascara.CEP:
			    {
				    writer.AddAttribute("MaxLength","9"); 
				    writer.AddAttribute("mask","_____-___"); 
				    writer.AddAttribute("onkeydown","EE_KeyDown(this)"); 
				    writer.AddAttribute("onkeypress","EE_KeyPress(this)"); 
				    writer.AddAttribute("onclick","EE_OnClick(this)"); 
				    writer.AddAttribute("onfocus","EE_GotFocus(this)"); 
				    writer.AddAttribute("onblur","EE_LostFocus(this)"); 
                    break;
			    }
    		
            }
		    base.Render(writer);
		}

		protected override void OnPreRender(System.EventArgs e)
		{
			if ( ! Page.ClientScript.IsClientScriptBlockRegistered(idScript))
			{
				Page.ClientScript.RegisterClientScriptBlock(this.GetType(), idScript, "<script src='mascara.js'></script>");
			}
		}

	}
	
	
}
