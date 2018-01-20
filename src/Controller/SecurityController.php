<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\Register;
use App\Form\Login;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Psr\Log\LoggerInterface;

/**
 * Reference:
 * https://symfony.com/doc/current/forms.html
 * https://symfony.com/doc/current/security/entity_provider.html
 * http://symfony.com/doc/current/doctrine/registration_form.html
 * http://symfony.com/doc/current/form/form_customization.html
 *
 */
class SecurityController extends Controller
{
    /**
     * @Route("/login", name="login")
     */

    public function login(Request $request, AuthenticationUtils $authUtils)
    {
        $login_error = $authUtils->getLastAuthenticationError();

        $lastUsername = $authUtils->getLastUsername();
        
        return $this->render('security/Login.html.twig', array(
            'last_username' => $lastUsername,
            'error'         => $login_error,
        ));
    }

    /**
     * @Route("/register", name="register")
    */

    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, LoggerInterface $logger)
    {
        $user = new User();
        $form = $this->createForm(Register::class, $user);

        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            // hash password
            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            //  save user into db
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('home');
        }

        return $this->render(
            'security/Signup.html.twig',
            array('form' => $form->createView())
        );
    }
}
