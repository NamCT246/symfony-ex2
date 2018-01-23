<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Psr\Log\LoggerInterface;

class DirectionController extends Controller
{
    /**
       * @Route("/direction", name="direction")
      */

    public function getDirection(Request $request, LoggerInterface $logger)
    {
        $r_data = json_decode($request->getContent(), true);


        return new Response('Ok. now request the route');
    }
}
