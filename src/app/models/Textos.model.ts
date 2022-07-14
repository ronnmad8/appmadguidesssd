//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class TextosModel{
    
    id: number;
    manu_who: string;
    manu_blog: string;
    manu_help: string;
    tour_title: string;
    tour_message1: string;
    tour_message2: string;
    tour_input: string;
    tour_boton: string;
    icons_guide: string;
    icons_group: string;
    icons_talk: string;
    icons_price: string;
    visit_message1: string;
    visit_message2: string;
    visit_button: string;
    opinions_title: string;
    opinions_view: string;
    image_message: string;
    form_title: string;
    form_who: string;
    form_blog: string;
    form_help: string;
    form_covid: string;

    footer_menu1_title: string;
    footer_menu1_who: string;
    footer_menu1_blog: string;
    footer_menu1_help: string;
    footer_menu1_covid: string;
    footer_menu2_title: string;
    footer_menu2_policy: string;
    footer_menu2_notice: string;
    footer_menu2_cookie: string;
    footer_menu2_purchase: string;

    constructor(){
        this.id = 0;
        this.manu_who = "";
        this.manu_blog= "";
        this.manu_help= "";
        this.tour_title= "";
        this.tour_message1= "";
        this.tour_message2= "";
        this.tour_input= "";
        this.tour_boton= "";
        this.icons_guide= "";
        this.icons_group= "";
        this.icons_talk= "";
        this.icons_price= "";
        this.visit_message1= "";
        this.visit_message2= "";
        this.visit_button= "";
        this.opinions_title= "";
        this.opinions_view= "";
        this.image_message= "";
        this.form_title= "";
        this.form_who= "";
        this.form_blog= "";
        this.form_help= "";
        this.form_covid= "";

        this.footer_menu1_title= "";
        this.footer_menu1_who= "";
        this.footer_menu1_blog= "";
        this.footer_menu1_help= "";
        this.footer_menu1_covid= "";
        this.footer_menu2_title= "";
        this.footer_menu2_policy= "";
        this.footer_menu2_notice= "";
        this.footer_menu2_cookie= "";
        this.footer_menu2_purchase= "";
    }

}