package com.vcet.campushire.admin.companymanagement.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CompanyExceptionAspect {

    @Pointcut(
            "execution(* com.vcet.campushire.admin.companymanagement.controller..*(..)) || " +
                    "execution(* com.vcet.campushire.admin.companymanagement.service..*(..))"
    )
    public void exceptionMethods() {}

    @AfterThrowing(
            pointcut = "exceptionMethods()",
            throwing = "exception"
    )
    public void logException(JoinPoint joinPoint, Throwable exception) {

        System.err.println(
                "[EXCEPTION] Method: " +
                        joinPoint.getSignature().toShortString()
        );
        System.err.println(
                "[EXCEPTION] Message: " + exception.getMessage()
        );
    }
}
