<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<style>
.journal-header {
  max-width: auto;
  margin: 2rem 0rem 0rem 0rem;
  padding: 0 1.5rem;
  text-align: center;
  color: #000;
}

.header-top {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
	line-height: 3.6rem;
}

.est,
.issn {
  font-family: Palatino, Optima, serif;
  font-size: 1.5rem;
  letter-spacing: 0.08em;
}

.symbol {
  display: block;
  margin-top: 0.4rem;
  width: 50px;
}

.title {
    font-family: Palatino, Optima, serif;
    font-size: 5.2rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin: 0;
}

.header-subtitle {
    margin-top: 0.8rem;
    padding-top: 0.5rem;
    border-top: 1px solid #000;
    font-family: Palatino, Optima, serif;
    font-size: 1.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-bottom: 1px solid #000;
    padding-bottom: 0.5rem;
}
@media (max-width: 768px) {
  .header-top {
    
    gap: 0.5rem;
  }

  .est,
.issn {
  font-family: Palatino, Optima, serif;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}
.right {
  text-align: right;
	line-height: 2rem;
}
  .symbol {
    margin: 0.5rem auto 0;
  }

  .title {
    font-size: 2.4rem;
  }
	
	.header-subtitle {
    
    font-size: 0.5rem;
    
}
}

</style>
<header class="journal-header">
  <div class="header-top">
    <div class="left">
      <span class="est">EST. 2026</span>
      <img src="https://solverscave.com/wpdemo/wp-content/uploads/2026/01/ebenezer-vert.png" alt="Ebenezer symbol" class="symbol">
    </div>

    <div class="center">
     
    </div>

    <div class="right">
      <span class="issn">ISSN: 0000-123X</span>
 <h1 class="title">ebenezer</h1>
    </div>
  </div>

  <div class="header-subtitle">
    A SUPPLEMENTAL E-JOURNAL FOR PUBLIC THEOLOGY &amp; PUBLIC WITNESS
  </div>
</header>


