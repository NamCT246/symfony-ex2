<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        $welcome = "Hello World";
        return $this->render('home/home.html.twig', [
          'welcome'=> $welcome
       ]);
    }
}
