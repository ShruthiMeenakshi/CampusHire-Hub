package com.vcet.campushire.aop;

import com.vcet.campushire.exception.InvalidEligibilityException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CompanyValidationAspect {

    @Pointcut(
            "execution(* com.vcet.campushire.admin.companymanagement.service..*(..))"
    )
    public void serviceMethods() {}

    @Before("serviceMethods()")
    public void validateInputs(JoinPoint joinPoint) {

        Object[] args = joinPoint.getArgs();

        for (Object arg : args) {
            if (arg == null) {
                throw new InvalidEligibilityException(
                        "Invalid request: Null value passed to service layer"
                );
            }
        }
    }
}
